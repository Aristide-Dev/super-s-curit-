<?php

namespace App\Seo;

class SitemapEntries
{
    /**
     * @return list<array<string, mixed>>
     */
    public static function all(): array
    {
        $pages = config('seo.pages', []);
        $legal = collect(config('seo.legal_pages', []))
            ->map(fn (array $page): array => [
                ...$page,
                'changefreq' => $page['changefreq'] ?? 'yearly',
                'priority' => $page['priority'] ?? 0.3,
                'image' => config('seo.default_og_image'),
                'sources' => ['config/seo.php'],
            ])
            ->all();

        $caseStudies = collect(config('seo.case_studies', []))
            ->map(fn (array $study): array => [
                ...$study,
                'sources' => ['config/seo.php', 'resources/js/pages/marketing/case-study.tsx'],
            ])
            ->all();

        $servicePages = collect(config('seo.services', []))
            ->map(fn (array $service): array => [
                'path' => $service['path'],
                'changefreq' => 'monthly',
                'priority' => 0.9,
                'image' => $service['og_image'] ?? config('seo.default_og_image'),
                'sources' => ['config/seo.php'],
            ])
            ->all();

        $existingPaths = collect($pages)->pluck('path')->all();

        $merged = $pages;

        foreach ([...$servicePages, ...$caseStudies, ...$legal] as $entry) {
            if (! in_array($entry['path'], $existingPaths, true)) {
                $merged[] = $entry;
                $existingPaths[] = $entry['path'];
            }
        }

        return $merged;
    }
}
