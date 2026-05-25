<?php

use Inertia\Testing\AssertableInertia as Assert;

test('robots.txt is served dynamically with sitemap reference', function () {
    $response = $this->get(route('robots'));

    $response->assertOk();
    $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
    $response->assertSeeText('User-agent: *');
    $response->assertSeeText('Sitemap: '.url('/sitemap.xml'));
    $response->assertSeeText('Disallow: /dashboard');
});

test('sitemap.xml lists public marketing pages', function () {
    $response = $this->get(route('sitemap'));

    $response->assertOk();
    $response->assertHeader('Content-Type', 'text/xml; charset=utf-8');

    $content = $response->getContent();

    expect($content)
        ->toContain('<urlset')
        ->toContain(url('/'))
        ->toContain(url('/a-propos'))
        ->toContain(url('/contact'));
});

test('marketing pages share seo defaults', function () {
    $response = $this->get(route('home'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('marketing/home')
        ->has('seo', fn (Assert $seo) => $seo
            ->where('siteName', config('seo.site_name'))
            ->where('siteUrl', rtrim((string) config('app.url'), '/'))
            ->where('locale', config('seo.locale'))
            ->where('language', config('seo.language'))
            ->has('defaultImage')
            ->has('twitterSite')
            ->has('organization')
        )
    );
});
