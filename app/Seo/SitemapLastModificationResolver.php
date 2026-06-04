<?php

namespace App\Seo;

use Carbon\Carbon;
use Carbon\CarbonInterface;

class SitemapLastModificationResolver
{
    /**
     * @param  array{path: string, sources?: list<string>}  $page
     */
    public function resolve(array $page): CarbonInterface
    {
        $latest = null;

        foreach ($page['sources'] ?? [] as $relativePath) {
            $absolutePath = base_path($relativePath);

            if (! is_file($absolutePath)) {
                continue;
            }

            $modified = Carbon::createFromTimestamp(filemtime($absolutePath));

            if ($latest === null || $modified->greaterThan($latest)) {
                $latest = $modified;
            }
        }

        return $latest ?? now();
    }
}
