<?php

namespace App\Http\Controllers;

use App\Seo\SitemapEntries;
use App\Seo\SitemapLastModificationResolver;
use Illuminate\Http\Response;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    public function __construct(
        private SitemapLastModificationResolver $lastModified,
    ) {}

    public function __invoke(): Response
    {
        $sitemap = Sitemap::create();

        foreach (SitemapEntries::all() as $page) {
            $url = Url::create(url($page['path']))
                ->setLastModificationDate($this->lastModified->resolve($page))
                ->setChangeFrequency($page['changefreq'] ?? 'monthly')
                ->setPriority($page['priority'] ?? 0.5);

            if (! empty($page['image'])) {
                $url->addImage(url($page['image']));
            }

            $sitemap->add($url);
        }

        return $sitemap->toResponse(request())
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache');
    }
}
