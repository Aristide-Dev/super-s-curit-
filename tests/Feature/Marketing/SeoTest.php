<?php

use Inertia\Testing\AssertableInertia as Assert;

test('robots.txt is served dynamically with sitemap reference', function () {
    $response = $this->get(route('robots'));

    $response->assertOk();
    $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
    $response->assertSeeText('User-agent: *');
    $response->assertSeeText('Sitemap: '.url('/sitemap.xml'));
    $response->assertSeeText('Disallow: /dashboard');
    $response->assertSeeText('Disallow: /analytics');
});

test('robots.txt allows ai crawlers for aeo', function () {
    $response = $this->get(route('robots'));

    $response->assertOk()
        ->assertSeeText('User-agent: GPTBot')
        ->assertSeeText('User-agent: PerplexityBot');
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
        ->toContain(url('/creation-site'))
        ->toContain(url('/integrateur-solutions'))
        ->toContain(url('/woocommerce'))
        ->toContain(url('/application-web'))
        ->toContain(url('/seo'))
        ->toContain(url('/contact'));
});

test('legacy site-wordpress url redirects to creation-site', function () {
    $this->get('/site-wordpress')
        ->assertRedirect('/creation-site');
});

test('dedicated service pages are available for seo landing traffic', function (string $routeName, string $component) {
    $this->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'creation site' => ['creation-site', 'marketing/creation-site'],
    'integrateur solutions' => ['integrateur-solutions', 'marketing/integrateur-solutions'],
    'woocommerce' => ['woocommerce', 'marketing/woocommerce'],
    'application web' => ['application-web', 'marketing/application-web'],
    'seo' => ['seo', 'marketing/referencement-seo'],
]);

test('sitemap.xml includes images for pages', function () {
    $response = $this->get(route('sitemap'));

    expect($response->getContent())->toContain('<image:image>');
});

test('home seo meta includes local search terms', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('seo.organization.addressLocality', 'Conakry')
            ->has('seo.knowsAbout')
            ->where('seo.knowsAbout', fn ($terms): bool => $terms->contains('agence web Conakry')
                && $terms->contains('prix création site web Guinée')
                && $terms->contains('agence web Afrique de l\'Ouest')
                && $terms->contains('Intégrateur de solutions')
                && $terms->contains('Référencement SEO'))
            ->where('seo.services.3.name', 'Intégrateur de solutions')
        );
});

test('marketing pages share seo defaults', function () {
    $response = $this->get(route('home'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('marketing/home')
        ->has('seo.siteName')
        ->has('seo.siteUrl')
        ->has('seo.ogImage')
        ->has('seo.geo')
        ->has('seo.sameAs')
        ->has('seo.services')
        ->has('seo.organization.founderJobTitle')
        ->where('seo.siteName', config('seo.site_name'))
        ->where('seo.organization.addressLocality', config('seo.organization.address_locality'))
    );
});
