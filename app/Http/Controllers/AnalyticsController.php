<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Support\VisitTracking;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    /** Allowed period values (in days). */
    private const ALLOWED_PERIODS = [7, 14, 30, 90];

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Visit::class);

        $period = (int) $request->query('period', 30);
        $period = in_array($period, self::ALLOWED_PERIODS, strict: true) ? $period : 30;

        $filters = $this->resolveFilters($request);

        $from = Carbon::now()->subDays($period)->startOfDay();
        $to = Carbon::now()->endOfDay();

        $base = $this->applyFilters(
            Visit::query()
                ->where('is_bot', false)
                ->whereBetween('created_at', [$from, $to]),
            $filters,
        );

        return Inertia::render('analytics/index', [
            'period' => $period,
            'filters' => $filters,
            'filterOptions' => $this->filterOptions(),
            'kpis' => $this->kpis(fn () => $this->baseQuery($filters), $period),
            'chartData' => $this->chartData(clone $base, $period, $from),
            'topPages' => $this->topPages(clone $base),
            'topReferrers' => $this->topReferrers(clone $base),
            'countries' => $this->topCountries(clone $base),
            'cities' => $this->topCities(clone $base),
            'browsers' => $this->groupBy(clone $base, 'browser'),
            'devices' => $this->groupBy(clone $base, 'device'),
            'platforms' => $this->groupBy(clone $base, 'platform'),
            'weekdayStats' => $this->weekdayStats(clone $base),
            'hourlyStats' => $this->hourlyStats(clone $base),
            'timezone' => config('app.timezone'),
        ]);
    }

    public function updateDuration(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'visitor_uuid' => ['nullable', 'string', 'max:64'],
            'session_id' => ['nullable', 'string', 'max:128'],
            'path' => ['required', 'string', 'max:2048'],
            'duration' => ['required', 'integer', 'min:1', 'max:86400'],
        ]);

        if (VisitTracking::isExcludedPath($validated['path'])) {
            return response()->json(['ok' => true]);
        }

        $query = Visit::query()->where('path', $validated['path']);

        if (! empty($validated['visitor_uuid'])) {
            $query->where('visitor_uuid', $validated['visitor_uuid']);
        } elseif (! empty($validated['session_id'])) {
            $query->where('session_id', $validated['session_id']);
        } else {
            return response()->json(['ok' => true]);
        }

        $visit = $query->latest('id')->first();

        if ($visit !== null) {
            $visit->update([
                'duration_seconds' => $validated['duration'],
                'is_bounce' => $validated['duration'] < 30,
            ]);
        }

        return response()->json(['ok' => true]);
    }

    /**
     * @return array{pages: list<string>, countries: list<string>, cities: list<string>, browsers: list<string>, devices: list<string>, platforms: list<string>}
     */
    private function resolveFilters(Request $request): array
    {
        return [
            'pages' => $this->stringArray($request->query('pages')),
            'countries' => $this->stringArray($request->query('countries')),
            'cities' => $this->stringArray($request->query('cities')),
            'browsers' => $this->stringArray($request->query('browsers')),
            'devices' => $this->stringArray($request->query('devices')),
            'platforms' => $this->stringArray($request->query('platforms')),
        ];
    }

    /**
     * @return list<string>
     */
    private function stringArray(mixed $value): array
    {
        if ($value === null || $value === '') {
            return [];
        }

        $values = is_array($value) ? $value : [$value];

        return array_values(array_unique(array_filter(array_map(
            static fn ($item) => is_string($item) ? trim($item) : null,
            $values,
        ))));
    }

    /**
     * @param  array{pages: list<string>, countries: list<string>, cities: list<string>, browsers: list<string>, devices: list<string>, platforms: list<string>}  $filters
     * @param  Builder<Visit>  $query
     * @return Builder<Visit>
     */
    private function applyFilters(Builder $query, array $filters): Builder
    {
        if ($filters['pages'] !== []) {
            $query->whereIn('path', $filters['pages']);
        }

        if ($filters['countries'] !== []) {
            $query->whereIn('country_code', $filters['countries']);
        }

        if ($filters['cities'] !== []) {
            $query->where(function (Builder $cityQuery) use ($filters): void {
                foreach ($filters['cities'] as $token) {
                    $parsed = $this->parseCityToken($token);
                    if ($parsed === null) {
                        continue;
                    }

                    [$countryCode, $city] = $parsed;
                    $cityQuery->orWhere(function (Builder $match) use ($countryCode, $city): void {
                        $match->where('country_code', $countryCode)->where('city', $city);
                    });
                }
            });
        }

        if ($filters['browsers'] !== []) {
            $query->whereIn('browser', $filters['browsers']);
        }

        if ($filters['devices'] !== []) {
            $query->whereIn('device', $filters['devices']);
        }

        if ($filters['platforms'] !== []) {
            $query->whereIn('platform', $filters['platforms']);
        }

        return $query;
    }

    /**
     * @param  array{pages: list<string>, countries: list<string>, cities: list<string>, browsers: list<string>, devices: list<string>, platforms: list<string>}  $filters
     * @return Builder<Visit>
     */
    private function baseQuery(array $filters): Builder
    {
        return $this->applyFilters(
            Visit::query()->where('is_bot', false),
            $filters,
        );
    }

    /**
     * @return array{pages: list<string>, countries: list<array{code: string, label: string}>, cities: list<array{value: string, label: string, city: string, country_code: string}>, browsers: list<string>, devices: list<string>, platforms: list<string>}
     */
    private function filterOptions(): array
    {
        $base = Visit::query()->where('is_bot', false);

        $countries = (clone $base)
            ->whereNotNull('country_code')
            ->select('country_code', 'country')
            ->distinct()
            ->orderBy('country')
            ->get()
            ->map(fn ($row) => [
                'code' => (string) $row->country_code,
                'label' => (string) ($row->country ?? $row->country_code),
            ])
            ->values()
            ->all();

        $cities = (clone $base)
            ->whereNotNull('city')
            ->where('city', '!=', '')
            ->whereNotNull('country_code')
            ->select('city', 'country_code', 'country')
            ->distinct()
            ->orderBy('city')
            ->get()
            ->map(fn ($row) => [
                'value' => $this->cityToken((string) $row->country_code, (string) $row->city),
                'label' => (string) $row->city.', '.($row->country ?? $row->country_code),
                'city' => (string) $row->city,
                'country_code' => (string) $row->country_code,
            ])
            ->values()
            ->all();

        return [
            'pages' => $this->distinctValues(clone $base, 'path'),
            'countries' => $countries,
            'cities' => $cities,
            'browsers' => $this->distinctValues(clone $base, 'browser'),
            'devices' => $this->distinctValues(clone $base, 'device'),
            'platforms' => $this->distinctValues(clone $base, 'platform'),
        ];
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<string>
     */
    private function distinctValues(Builder $base, string $column): array
    {
        return $base
            ->whereNotNull($column)
            ->where($column, '!=', '')
            ->orderBy($column)
            ->distinct()
            ->pluck($column)
            ->map(static fn ($value) => (string) $value)
            ->all();
    }

    /**
     * @param  callable(): Builder<Visit>  $base
     * @return array<string, mixed>
     */
    private function kpis(callable $base, int $period): array
    {
        $current = $base()
            ->whereBetween('created_at', [
                Carbon::now()->subDays($period)->startOfDay(),
                Carbon::now()->endOfDay(),
            ]);

        $previous = $base()
            ->whereBetween('created_at', [
                Carbon::now()->subDays($period * 2)->startOfDay(),
                Carbon::now()->subDays($period)->endOfDay(),
            ]);

        $total = (clone $current)->count();
        $prevTotal = (clone $previous)->count();

        $unique = (clone $current)->distinct('visitor_uuid')->count('visitor_uuid');
        $prevUnique = (clone $previous)->distinct('visitor_uuid')->count('visitor_uuid');

        $sessions = (clone $current)->distinct('session_id')->count('session_id');
        $prevSessions = (clone $previous)->distinct('session_id')->count('session_id');

        $avgDuration = (int) ((clone $current)->whereNotNull('duration_seconds')->avg('duration_seconds') ?? 0);
        $bounceRate = $total > 0
            ? round((clone $current)->where('is_bounce', true)->count() * 100 / $total, 1)
            : 0;

        return [
            'total_views' => $total,
            'total_views_change' => $this->percentChange($prevTotal, $total),
            'unique_visitors' => $unique,
            'unique_visitors_change' => $this->percentChange($prevUnique, $unique),
            'sessions' => $sessions,
            'sessions_change' => $this->percentChange($prevSessions, $sessions),
            'avg_duration_seconds' => $avgDuration,
            'bounce_rate' => $bounceRate,
        ];
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{date: string, views: int, visitors: int}>
     */
    private function chartData(Builder $base, int $period, Carbon $from): array
    {
        $rows = (clone $base)
            ->select(
                DB::raw('DATE(created_at) as visit_date'),
                DB::raw('COUNT(*) as views'),
                DB::raw('COUNT(DISTINCT visitor_uuid) as visitors'),
            )
            ->groupBy('visit_date')
            ->orderBy('visit_date')
            ->get()
            ->keyBy('visit_date');

        $days = [];
        for ($i = 0; $i <= $period; $i++) {
            $date = $from->copy()->addDays($i)->toDateString();
            $row = $rows->get($date);
            $days[] = [
                'date' => $date,
                'views' => (int) ($row?->views ?? 0),
                'visitors' => (int) ($row?->visitors ?? 0),
            ];
        }

        return $days;
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{path: string, views: int, visitors: int, avg_duration: int}>
     */
    private function topPages(Builder $base): array
    {
        return (clone $base)
            ->select(
                'path',
                DB::raw('COUNT(*) as views'),
                DB::raw('COUNT(DISTINCT visitor_uuid) as visitors'),
                DB::raw('COALESCE(AVG(duration_seconds), 0) as avg_duration'),
            )
            ->groupBy('path')
            ->orderByDesc('views')
            ->limit(15)
            ->get()
            ->map(fn ($row) => [
                'path' => (string) $row->path,
                'views' => (int) $row->views,
                'visitors' => (int) $row->visitors,
                'avg_duration' => (int) $row->avg_duration,
            ])
            ->all();
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{referrer_domain: string, count: int}>
     */
    private function topReferrers(Builder $base): array
    {
        $appHost = parse_url(config('app.url'), PHP_URL_HOST);

        return (clone $base)
            ->select('referrer_domain', DB::raw('COUNT(*) as count'))
            ->whereNotNull('referrer_domain')
            ->when($appHost, fn ($q) => $q->where('referrer_domain', '!=', $appHost))
            ->groupBy('referrer_domain')
            ->orderByDesc('count')
            ->limit(10)
            ->get()
            ->map(fn ($row) => [
                'referrer_domain' => (string) $row->referrer_domain,
                'count' => (int) $row->count,
            ])
            ->all();
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{country_code: string, country: string, views: int, visitors: int, percentage: float}>
     */
    private function topCountries(Builder $base): array
    {
        $rows = (clone $base)
            ->select(
                'country_code',
                'country',
                DB::raw('COUNT(*) as views'),
                DB::raw('COUNT(DISTINCT visitor_uuid) as visitors'),
            )
            ->whereNotNull('country_code')
            ->groupBy('country_code', 'country')
            ->orderByDesc('views')
            ->limit(12)
            ->get();

        $total = (int) $rows->sum('views');

        return $rows->map(fn ($row) => [
            'country_code' => (string) $row->country_code,
            'country' => (string) ($row->country ?? $row->country_code),
            'views' => (int) $row->views,
            'visitors' => (int) $row->visitors,
            'percentage' => $total > 0 ? round($row->views * 100 / $total, 1) : 0,
        ])->all();
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{value: string, city: string, country_code: string, country: string, views: int, visitors: int, percentage: float}>
     */
    private function topCities(Builder $base): array
    {
        $rows = (clone $base)
            ->select(
                'city',
                'country_code',
                'country',
                DB::raw('COUNT(*) as views'),
                DB::raw('COUNT(DISTINCT visitor_uuid) as visitors'),
            )
            ->whereNotNull('city')
            ->where('city', '!=', '')
            ->whereNotNull('country_code')
            ->groupBy('city', 'country_code', 'country')
            ->orderByDesc('views')
            ->limit(15)
            ->get();

        $total = (int) $rows->sum('views');

        return $rows->map(fn ($row) => [
            'value' => $this->cityToken((string) $row->country_code, (string) $row->city),
            'city' => (string) $row->city,
            'country_code' => (string) $row->country_code,
            'country' => (string) ($row->country ?? $row->country_code),
            'views' => (int) $row->views,
            'visitors' => (int) $row->visitors,
            'percentage' => $total > 0 ? round($row->views * 100 / $total, 1) : 0,
        ])->all();
    }

    private function cityToken(string $countryCode, string $city): string
    {
        return strtoupper($countryCode).':'.$city;
    }

    /**
     * @return array{0: string, 1: string}|null
     */
    private function parseCityToken(string $token): ?array
    {
        if (! str_contains($token, ':')) {
            return null;
        }

        [$countryCode, $city] = explode(':', $token, 2);
        $countryCode = strtoupper(trim($countryCode));
        $city = trim($city);

        if (strlen($countryCode) !== 2 || $city === '') {
            return null;
        }

        return [$countryCode, $city];
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{label: string, count: int, percentage: float}>
     */
    private function groupBy(Builder $base, string $column): array
    {
        $rows = (clone $base)
            ->select($column, DB::raw('COUNT(*) as count'))
            ->whereNotNull($column)
            ->where($column, '!=', '')
            ->groupBy($column)
            ->orderByDesc('count')
            ->limit(8)
            ->get();

        $total = (int) $rows->sum('count');

        return $rows->map(fn ($row) => [
            'label' => (string) ($row->{$column} ?? 'Inconnu'),
            'count' => (int) $row->count,
            'percentage' => $total > 0 ? round($row->count * 100 / $total, 1) : 0,
        ])->all();
    }

    private function percentChange(int $old, int $new): ?float
    {
        if ($old === 0) {
            return null;
        }

        return round(($new - $old) * 100 / $old, 1);
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{day: int, label: string, views: int, visitors: int, percentage: float, is_peak: bool}>
     */
    private function weekdayStats(Builder $base): array
    {
        $grouped = $this->aggregateByDimension(clone $base, $this->weekdaySqlExpression());

        return $this->buildDistribution(
            keys: range(1, 7),
            labels: self::WEEKDAY_LABELS,
            grouped: $grouped,
            keyToIndex: static fn (int $key) => $key,
        );
    }

    /**
     * @param  Builder<Visit>  $base
     * @return list<array{hour: int, label: string, views: int, visitors: int, percentage: float, is_peak: bool}>
     */
    private function hourlyStats(Builder $base): array
    {
        $grouped = $this->aggregateByDimension(clone $base, $this->hourSqlExpression());

        return $this->buildDistribution(
            keys: range(0, 23),
            labels: array_map(static fn (int $h) => sprintf('%02dh', $h), range(0, 23)),
            grouped: $grouped,
            keyToIndex: static fn (int $key) => $key,
            labelKey: 'hour',
        );
    }

    /** @var array<int, string> ISO weekday: 1 = Monday … 7 = Sunday */
    private const WEEKDAY_LABELS = [
        1 => 'Lundi',
        2 => 'Mardi',
        3 => 'Mercredi',
        4 => 'Jeudi',
        5 => 'Vendredi',
        6 => 'Samedi',
        7 => 'Dimanche',
    ];

    /**
     * @return array<int, array{views: int, visitors: int}>
     */
    private function aggregateByDimension(Builder $base, string $dimensionSql): array
    {
        $rows = (clone $base)
            ->select(
                DB::raw("{$dimensionSql} as bucket"),
                DB::raw('COUNT(*) as views'),
                DB::raw('COUNT(DISTINCT visitor_uuid) as visitors'),
            )
            ->groupBy('bucket')
            ->get();

        $grouped = [];
        foreach ($rows as $row) {
            $grouped[(int) $row->bucket] = [
                'views' => (int) $row->views,
                'visitors' => (int) $row->visitors,
            ];
        }

        return $grouped;
    }

    /**
     * @param  list<int>  $keys
     * @param  array<int, string>  $labels
     * @param  array<int, array{views: int, visitors: int}>  $grouped
     * @return list<array<string, mixed>>
     */
    private function buildDistribution(
        array $keys,
        array $labels,
        array $grouped,
        callable $keyToIndex,
        string $labelKey = 'day',
    ): array {
        $total = array_sum(array_column($grouped, 'views'));
        $peakViews = $total > 0 ? max(array_column($grouped, 'views')) : 0;

        $result = [];
        foreach ($keys as $key) {
            $index = $keyToIndex($key);
            $row = $grouped[$index] ?? ['views' => 0, 'visitors' => 0];
            $views = $row['views'];

            $result[] = [
                $labelKey => $key,
                'label' => $labels[$key],
                'views' => $views,
                'visitors' => $row['visitors'],
                'percentage' => $total > 0 ? round($views * 100 / $total, 1) : 0.0,
                'is_peak' => $views > 0 && $views === $peakViews,
            ];
        }

        return $result;
    }

    private function weekdaySqlExpression(): string
    {
        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return "CASE WHEN strftime('%w', created_at) = '0' THEN 7 ELSE CAST(strftime('%w', created_at) AS INTEGER) END";
        }

        return 'WEEKDAY(created_at) + 1';
    }

    private function hourSqlExpression(): string
    {
        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return "CAST(strftime('%H', created_at) AS INTEGER)";
        }

        return 'HOUR(created_at)';
    }
}
