<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function __invoke(): Response
    {
        $lines = $this->rulesForUserAgent('*');

        foreach (config('seo.ai_crawlers', []) as $crawler) {
            $lines[] = '';
            $lines = array_merge($lines, $this->rulesForUserAgent($crawler));
        }

        $lines[] = '';
        $lines[] = 'Sitemap: '.url('/sitemap.xml');

        return response(implode("\n", $lines), 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }

    /**
     * @return list<string>
     */
    private function rulesForUserAgent(string $agent): array
    {
        $lines = [
            "User-agent: {$agent}",
            'Allow: /',
        ];

        foreach (config('seo.robots_disallow', []) as $path) {
            $lines[] = 'Disallow: '.$path;
        }

        return $lines;
    }
}
