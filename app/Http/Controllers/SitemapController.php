<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $sitemap = Sitemap::create();

        foreach (config('seo.pages', []) as $page) {
            $sitemap->add(
                Url::create($page['path'])
                    ->setLastModificationDate(now())
                    ->setChangeFrequency($page['changefreq'])
                    ->setPriority($page['priority']),
            );
        }

        return $sitemap->toResponse(request());
    }
}
