<?php

namespace App\Support;

class GuineaLocationData
{
    /**
     * @return array{
     *     regions: list<array<string, mixed>>,
     *     prefectures: list<array<string, mixed>>,
     *     communes: list<array<string, mixed>>,
     *     quartiers: list<array<string, mixed>>
     * }
     */
    public static function all(): array
    {
        static $cache = null;

        if ($cache !== null) {
            return $cache;
        }

        $path = database_path('data/guinea-localisation.json');

        if (! file_exists($path)) {
            return $cache = [
                'regions' => [],
                'prefectures' => [],
                'communes' => [],
                'quartiers' => [],
            ];
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        return $cache = [
            'regions' => $decoded['regions'] ?? [],
            'prefectures' => $decoded['prefectures'] ?? [],
            'communes' => $decoded['communes'] ?? [],
            'quartiers' => $decoded['quartiers'] ?? [],
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function findRegion(string $id): ?array
    {
        return collect(self::all()['regions'])->firstWhere('id', $id);
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function findPrefecture(string $id): ?array
    {
        return collect(self::all()['prefectures'])->firstWhere('id', $id);
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function findCommune(string $id): ?array
    {
        return collect(self::all()['communes'])->firstWhere('id', $id);
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function findQuartier(string $id): ?array
    {
        return collect(self::all()['quartiers'])->firstWhere('id', $id);
    }

    /**
     * @return list<array<string, mixed>>
     */
    public static function communesForPrefecture(string $prefectureId): array
    {
        return array_values(array_filter(
            self::all()['communes'],
            fn (array $commune): bool => ($commune['prefectureId'] ?? null) === $prefectureId,
        ));
    }

    /**
     * @return list<array<string, mixed>>
     */
    public static function quartiersForCommune(string $communeId): array
    {
        return array_values(array_filter(
            self::all()['quartiers'],
            fn (array $quartier): bool => ($quartier['communeId'] ?? null) === $communeId,
        ));
    }
}
