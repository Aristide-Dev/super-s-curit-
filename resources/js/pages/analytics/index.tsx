import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowDown,
    ArrowUp,
    BarChart3,
    Clock,
    Eraser,
    FileText,
    Globe,
    Laptop,
    Monitor,
    MousePointerClick,
    Smartphone,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useMemo } from 'react';
import CountryFlag from '@/components/analytics/country-flag';
import FilterMultiselect, {
    FilterChip,
} from '@/components/analytics/filter-multiselect';
import TrafficChart, {
    type ChartPoint,
} from '@/components/analytics/traffic-chart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { index } from '@/routes/analytics';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type KpiData = {
    total_views: number;
    total_views_change: number | null;
    unique_visitors: number;
    unique_visitors_change: number | null;
    sessions: number;
    sessions_change: number | null;
    avg_duration_seconds: number;
    bounce_rate: number;
};

type TopPage = {
    path: string;
    views: number;
    visitors: number;
    avg_duration: number;
};

type TopReferrer = { referrer_domain: string; count: number };

type GroupRow = { label: string; count: number; percentage: number };

type CountryRow = {
    country_code: string;
    country: string;
    views: number;
    visitors: number;
    percentage: number;
};

type Filters = {
    pages: string[];
    countries: string[];
    browsers: string[];
    devices: string[];
    platforms: string[];
};

type FilterOptions = {
    pages: string[];
    countries: { code: string; label: string }[];
    browsers: string[];
    devices: string[];
    platforms: string[];
};

type PageProps = {
    period: number;
    filters: Filters;
    filterOptions: FilterOptions;
    kpis: KpiData;
    chartData: ChartPoint[];
    topPages: TopPage[];
    topReferrers: TopReferrer[];
    countries: CountryRow[];
    browsers: GroupRow[];
    devices: GroupRow[];
    platforms: GroupRow[];
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function formatDuration(seconds: number): string {
    if (seconds < 1) {
        return '—';
    }
    if (seconds < 60) {
        return `${seconds}s`;
    }
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function formatNumber(n: number): string {
    return n.toLocaleString('fr-FR');
}

function ChangeChip({ value }: { value: number | null }) {
    if (value === null) {
        return <span className="text-muted-foreground text-xs">—</span>;
    }

    const positive = value >= 0;

    return (
        <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}
        >
            {positive ? (
                <ArrowUp className="size-3" aria-hidden />
            ) : (
                <ArrowDown className="size-3" aria-hidden />
            )}
            {Math.abs(value)}%
        </span>
    );
}

function KpiCard({
    icon: Icon,
    label,
    value,
    change,
    sub,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    change?: number | null;
    sub?: string;
}) {
    return (
        <div className="app-panel flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm font-medium">
                    {label}
                </span>
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
                    <Icon className="size-4" aria-hidden />
                </div>
            </div>
            <div className="flex items-end justify-between gap-2">
                <span className="font-heading text-3xl font-bold tracking-tight">
                    {value}
                </span>
                {change !== undefined && <ChangeChip value={change ?? null} />}
            </div>
            {sub && (
                <span className="text-muted-foreground text-xs">{sub}</span>
            )}
        </div>
    );
}

function CountryStatRow({
    country_code,
    country,
    views,
    visitors,
    percentage,
}: CountryRow) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <CountryFlag code={country_code} className="h-4 w-6 shrink-0" />
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{country}</span>
                    <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {formatNumber(visitors)} visiteurs
                    </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                    <div className="bg-border h-1.5 flex-1 overflow-hidden rounded-full">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs tabular-nums">
                        {formatNumber(views)} ({percentage}%)
                    </span>
                </div>
            </div>
        </div>
    );
}

function BarRow({ label, count, percentage }: GroupRow) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground w-28 shrink-0 truncate">
                {label}
            </span>
            <div className="bg-border h-1.5 flex-1 overflow-hidden rounded-full">
                <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="w-10 text-right font-medium tabular-nums">
                {formatNumber(count)}
            </span>
            <span className="text-muted-foreground w-12 text-right tabular-nums">
                {percentage}%
            </span>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

const PERIODS = [
    { label: '7 j', value: 7 },
    { label: '14 j', value: 14 },
    { label: '30 j', value: 30 },
    { label: '90 j', value: 90 },
];

const DEVICE_LABELS: Record<string, string> = {
    desktop: 'Desktop',
    mobile: 'Mobile',
    tablet: 'Tablette',
    bot: 'Bot',
};

export default function AnalyticsIndex() {
    const {
        period,
        filters,
        filterOptions,
        kpis,
        chartData,
        topPages,
        topReferrers,
        countries,
        browsers,
        devices,
        platforms,
    } = usePage<PageProps>().props;

    const activeFilterCount = useMemo(
        () =>
            filters.pages.length +
            filters.countries.length +
            filters.browsers.length +
            filters.devices.length +
            filters.platforms.length,
        [filters],
    );

    const countryByCode = useMemo(() => {
        const map = new Map<string, string>();
        filterOptions.countries.forEach((c) => map.set(c.code, c.label));
        return map;
    }, [filterOptions.countries]);

    const applyFilters = (next: Partial<Filters>) => {
        const merged: Filters = { ...filters, ...next };
        const query: Record<string, string | string[]> = { period: String(period) };
        if (merged.pages.length) query.pages = merged.pages;
        if (merged.countries.length) query.countries = merged.countries;
        if (merged.browsers.length) query.browsers = merged.browsers;
        if (merged.devices.length) query.devices = merged.devices;
        if (merged.platforms.length) query.platforms = merged.platforms;

        router.visit(index.url({ query }), {
            preserveScroll: true,
            preserveState: false,
        });
    };

    const resetFilters = () => {
        router.visit(index.url({ query: { period: String(period) } }), {
            preserveScroll: true,
            preserveState: false,
        });
    };

    const removeFilter = (key: keyof Filters, value: string) => {
        applyFilters({
            [key]: filters[key].filter((v) => v !== value),
        });
    };

    return (
        <>
            <Head title="Analytics" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="font-heading text-primary flex items-center gap-2 text-2xl font-semibold tracking-tight">
                            <BarChart3 className="size-6" aria-hidden />
                            Analytics
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Trafic réel — hors bots, {period} derniers jours
                        </p>
                    </div>
                    <div className="border-border bg-card flex items-center gap-1 rounded-lg border p-1">
                        {PERIODS.map((p) => (
                            <Button
                                key={p.value}
                                variant={period === p.value ? 'default' : 'ghost'}
                                size="sm"
                                asChild
                            >
                                <Link
                                    href={index.url({
                                        query: {
                                            period: p.value,
                                            ...(filters.pages.length && { pages: filters.pages }),
                                            ...(filters.countries.length && { countries: filters.countries }),
                                            ...(filters.browsers.length && { browsers: filters.browsers }),
                                            ...(filters.devices.length && { devices: filters.devices }),
                                            ...(filters.platforms.length && { platforms: filters.platforms }),
                                        },
                                    })}
                                    preserveScroll
                                >
                                    {p.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Filter bar */}
                <div className="app-panel flex flex-wrap items-center gap-2 p-3">
                    <FilterMultiselect
                        label="Pages"
                        icon={FileText}
                        options={filterOptions.pages.map((p) => ({ value: p, label: p }))}
                        selected={filters.pages}
                        onChange={(values) => applyFilters({ pages: values })}
                        searchPlaceholder="Rechercher un chemin..."
                    />
                    <FilterMultiselect
                        label="Pays"
                        icon={Globe}
                        options={filterOptions.countries.map((c) => ({
                            value: c.code,
                            label: c.label,
                        }))}
                        selected={filters.countries}
                        onChange={(values) => applyFilters({ countries: values })}
                        searchPlaceholder="Rechercher un pays..."
                    />
                    <FilterMultiselect
                        label="Navigateurs"
                        icon={Monitor}
                        options={filterOptions.browsers.map((b) => ({ value: b, label: b }))}
                        selected={filters.browsers}
                        onChange={(values) => applyFilters({ browsers: values })}
                    />
                    <FilterMultiselect
                        label="Appareils"
                        icon={Smartphone}
                        options={filterOptions.devices.map((d) => ({
                            value: d,
                            label: DEVICE_LABELS[d] ?? d,
                        }))}
                        selected={filters.devices}
                        onChange={(values) => applyFilters({ devices: values })}
                    />
                    <FilterMultiselect
                        label="Systèmes"
                        icon={Laptop}
                        options={filterOptions.platforms.map((p) => ({ value: p, label: p }))}
                        selected={filters.platforms}
                        onChange={(values) => applyFilters({ platforms: values })}
                    />

                    {activeFilterCount > 0 && (
                        <>
                            <span className="bg-border mx-1 h-6 w-px" aria-hidden />
                            <div className="flex flex-wrap items-center gap-1.5">
                                {filters.pages.map((p) => (
                                    <FilterChip
                                        key={`p-${p}`}
                                        label={p}
                                        onRemove={() => removeFilter('pages', p)}
                                    />
                                ))}
                                {filters.countries.map((c) => (
                                    <FilterChip
                                        key={`c-${c}`}
                                        label={countryByCode.get(c) ?? c}
                                        onRemove={() => removeFilter('countries', c)}
                                    />
                                ))}
                                {filters.browsers.map((b) => (
                                    <FilterChip
                                        key={`b-${b}`}
                                        label={b}
                                        onRemove={() => removeFilter('browsers', b)}
                                    />
                                ))}
                                {filters.devices.map((d) => (
                                    <FilterChip
                                        key={`d-${d}`}
                                        label={DEVICE_LABELS[d] ?? d}
                                        onRemove={() => removeFilter('devices', d)}
                                    />
                                ))}
                                {filters.platforms.map((pl) => (
                                    <FilterChip
                                        key={`pl-${pl}`}
                                        label={pl}
                                        onRemove={() => removeFilter('platforms', pl)}
                                    />
                                ))}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="ml-auto gap-1.5"
                            >
                                <Eraser className="size-3.5" aria-hidden />
                                Réinitialiser
                            </Button>
                        </>
                    )}
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <KpiCard
                        icon={MousePointerClick}
                        label="Pages vues"
                        value={formatNumber(kpis.total_views)}
                        change={kpis.total_views_change}
                        sub="vs période précédente"
                    />
                    <KpiCard
                        icon={Users}
                        label="Visiteurs uniques"
                        value={formatNumber(kpis.unique_visitors)}
                        change={kpis.unique_visitors_change}
                    />
                    <KpiCard
                        icon={Activity}
                        label="Sessions"
                        value={formatNumber(kpis.sessions)}
                        change={kpis.sessions_change}
                    />
                    <KpiCard
                        icon={Clock}
                        label="Durée moy."
                        value={formatDuration(kpis.avg_duration_seconds)}
                        sub={`Taux de rebond : ${kpis.bounce_rate}%`}
                    />
                </div>

                {/* Traffic chart */}
                <div className="app-panel p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-heading text-sm font-semibold">
                            Évolution du trafic
                        </h2>
                        <div className="text-muted-foreground flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1.5">
                                <span className="bg-primary inline-block h-0.5 w-4 rounded-full" />
                                Pages vues
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span
                                    className="inline-block h-0.5 w-4 rounded-full bg-emerald-500"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(90deg, #10b981 50%, transparent 50%)',
                                        backgroundSize: '6px 2px',
                                    }}
                                />
                                Visiteurs uniques
                            </span>
                        </div>
                    </div>
                    <TrafficChart data={chartData} />
                </div>

                {/* Bottom grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Top pages */}
                    <div className="app-panel p-5 lg:col-span-2">
                        <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-semibold">
                            <TrendingUp className="text-primary size-4" aria-hidden />
                            Pages populaires
                        </h2>
                        <div className="divide-border divide-y">
                            {topPages.length === 0 ? (
                                <p className="text-muted-foreground py-6 text-center text-sm">
                                    Aucune donnée
                                </p>
                            ) : (
                                topPages.map((page) => {
                                    const isSelected = filters.pages.includes(page.path);
                                    return (
                                        <div
                                            key={page.path}
                                            className="flex items-center justify-between gap-2 py-2.5 text-sm"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    applyFilters({
                                                        pages: isSelected
                                                            ? filters.pages.filter((p) => p !== page.path)
                                                            : [...filters.pages, page.path],
                                                    })
                                                }
                                                className={`hover:text-primary max-w-[60%] truncate text-left font-mono text-xs ${isSelected ? 'text-primary font-semibold' : 'text-foreground'}`}
                                                title={`Filtrer sur ${page.path}`}
                                            >
                                                {page.path}
                                            </button>
                                            <div className="flex items-center gap-3">
                                                <span className="text-muted-foreground text-xs tabular-nums">
                                                    {formatDuration(page.avg_duration)}
                                                </span>
                                                <Badge variant="outline">
                                                    {formatNumber(page.views)} vues
                                                </Badge>
                                                <span className="text-muted-foreground text-xs">
                                                    {formatNumber(page.visitors)} visiteurs
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Countries */}
                    <div className="app-panel p-5 lg:col-span-2">
                        <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-semibold">
                            <Globe className="text-primary size-4" aria-hidden />
                            Pays des visiteurs
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {countries.length === 0 ? (
                                <p className="text-muted-foreground col-span-full py-6 text-center text-sm">
                                    Aucune donnée géographique pour cette période.
                                </p>
                            ) : (
                                countries.map((country) => {
                                    const isSelected = filters.countries.includes(
                                        country.country_code,
                                    );
                                    return (
                                        <button
                                            type="button"
                                            key={country.country_code}
                                            onClick={() =>
                                                applyFilters({
                                                    countries: isSelected
                                                        ? filters.countries.filter(
                                                              (c) => c !== country.country_code,
                                                          )
                                                        : [...filters.countries, country.country_code],
                                                })
                                            }
                                            className={`hover:bg-accent/40 rounded-md p-1 text-left transition ${isSelected ? 'bg-primary/5 ring-primary ring-1' : ''}`}
                                        >
                                            <CountryStatRow {...country} />
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Top referrers */}
                    <div className="app-panel p-5">
                        <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-semibold">
                            <Globe className="text-primary size-4" aria-hidden />
                            Sources de trafic
                        </h2>
                        <div className="divide-border divide-y">
                            {topReferrers.length === 0 ? (
                                <p className="text-muted-foreground py-6 text-center text-sm">
                                    Trafic direct uniquement
                                </p>
                            ) : (
                                topReferrers.map((ref) => (
                                    <div
                                        key={ref.referrer_domain}
                                        className="flex items-center justify-between gap-2 py-2.5 text-sm"
                                    >
                                        <span className="truncate">{ref.referrer_domain}</span>
                                        <Badge variant="secondary">
                                            {formatNumber(ref.count)}
                                        </Badge>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Browsers */}
                    <div className="app-panel p-5">
                        <h2 className="font-heading mb-4 flex items-center gap-2 text-sm font-semibold">
                            <Monitor className="text-primary size-4" aria-hidden />
                            Navigateurs
                        </h2>
                        <div className="space-y-3">
                            {browsers.map((b) => {
                                const isSelected = filters.browsers.includes(b.label);
                                return (
                                    <button
                                        type="button"
                                        key={b.label}
                                        onClick={() =>
                                            applyFilters({
                                                browsers: isSelected
                                                    ? filters.browsers.filter((v) => v !== b.label)
                                                    : [...filters.browsers, b.label],
                                            })
                                        }
                                        className={`hover:bg-accent/40 block w-full rounded-md p-1 text-left ${isSelected ? 'bg-primary/5 ring-primary ring-1' : ''}`}
                                    >
                                        <BarRow {...b} />
                                    </button>
                                );
                            })}
                            {browsers.length === 0 && (
                                <p className="text-muted-foreground text-center text-sm">
                                    Aucune donnée
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Devices */}
                    <div className="app-panel p-5">
                        <h2 className="font-heading mb-4 text-sm font-semibold">
                            Appareils
                        </h2>
                        <div className="space-y-3">
                            {devices.map((d) => {
                                const isSelected = filters.devices.includes(d.label);
                                return (
                                    <button
                                        type="button"
                                        key={d.label}
                                        onClick={() =>
                                            applyFilters({
                                                devices: isSelected
                                                    ? filters.devices.filter((v) => v !== d.label)
                                                    : [...filters.devices, d.label],
                                            })
                                        }
                                        className={`hover:bg-accent/40 block w-full rounded-md p-1 text-left ${isSelected ? 'bg-primary/5 ring-primary ring-1' : ''}`}
                                    >
                                        <BarRow
                                            label={DEVICE_LABELS[d.label] ?? d.label}
                                            count={d.count}
                                            percentage={d.percentage}
                                        />
                                    </button>
                                );
                            })}
                            {devices.length === 0 && (
                                <p className="text-muted-foreground text-center text-sm">
                                    Aucune donnée
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="app-panel p-5">
                        <h2 className="font-heading mb-4 text-sm font-semibold">
                            Systèmes
                        </h2>
                        <div className="space-y-3">
                            {platforms.map((p) => {
                                const isSelected = filters.platforms.includes(p.label);
                                return (
                                    <button
                                        type="button"
                                        key={p.label}
                                        onClick={() =>
                                            applyFilters({
                                                platforms: isSelected
                                                    ? filters.platforms.filter((v) => v !== p.label)
                                                    : [...filters.platforms, p.label],
                                            })
                                        }
                                        className={`hover:bg-accent/40 block w-full rounded-md p-1 text-left ${isSelected ? 'bg-primary/5 ring-primary ring-1' : ''}`}
                                    >
                                        <BarRow {...p} />
                                    </button>
                                );
                            })}
                            {platforms.length === 0 && (
                                <p className="text-muted-foreground text-center text-sm">
                                    Aucune donnée
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AnalyticsIndex.layout = {
    breadcrumbs: [{ title: 'Analytics', href: '/analytics' }],
};
