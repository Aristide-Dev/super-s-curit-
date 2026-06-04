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
        ->toContain(url('/contact'))
        ->toContain(url('/realisations'))
        ->toContain(url('/realisations/sily-link'))
        ->toContain(url('/politique-de-confidentialite'))
        ->toContain(url('/mentions-legales'));
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

test('sitemap.xml includes fresh lastmod dates from content sources', function () {
    $response = $this->get(route('sitemap'));

    $response->assertOk();

    expect($response->headers->get('Cache-Control'))
        ->toContain('no-cache')
        ->toContain('no-store');

    $content = $response->getContent();

    expect($content)
        ->toContain('<lastmod>')
        ->toMatch('/<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/');

    $homeSources = collect(config('seo.pages'))
        ->firstWhere('path', '/')['sources'] ?? [];

    $expectedLastmod = collect($homeSources)
        ->map(fn (string $path): int => filemtime(base_path($path)))
        ->max();

    expect($content)->toContain(
        '<lastmod>'.date('c', $expectedLastmod).'</lastmod>',
    );
});

test('marketing pages include server rendered title and description', function () {
    $response = $this->get(route('home'));

    $response->assertOk();

    expect($response->getContent())
        ->toContain('Agence Web')
        ->toContain('Applications')
        ->toContain('rel="canonical"')
        ->toContain('property="og:title"')
        ->toContain('application/ld+json');
});

test('service pages render optimized server side title from seo config', function () {
    $response = $this->get(route('creation-site'));

    $response->assertOk();

    $service = collect(config('seo.services'))->firstWhere('path', '/creation-site');

    expect($response->getContent())
        ->toContain($service['meta_title'])
        ->toContain($service['meta_description']);
});

test('each service page has a distinct open graph image', function (string $routeName, string $expectedOgPath) {
    $response = $this->get(route($routeName));

    $response->assertOk();

    expect($response->getContent())->toContain(url($expectedOgPath));
})->with([
    'application web' => ['application-web', '/images/aristech/services/conakry-women-app.png'],
    'creation site' => ['creation-site', '/images/aristech/services/Sites-Internet.jpg'],
    'woocommerce' => ['woocommerce', '/images/aristech/services/E-commerce.jpg'],
    'integrateur' => ['integrateur-solutions', '/images/aristech/services/API.jpg'],
    'seo' => ['seo', '/images/aristech/services/seo.jpg'],
]);

test('application web og image uses png mime type', function () {
    $this->get(route('application-web'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('pageMeta.og_image_type', 'image/png')
            ->where('pageMeta.og_image_alt', 'Application web et mobile sur mesure à Conakry — ArisTech')
        );
});

test('creation site page includes service faq structured data', function () {
    $response = $this->get(route('creation-site'));

    expect($response->getContent())
        ->toContain('FAQPage')
        ->toContain(config('seo.services.1.faqs.0.question'));
});

test('case study pages are available', function () {
    $this->get(route('realisations.show', 'sily-link'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('marketing/case-study')
            ->where('study.slug', 'sily-link')
        );
});

test('legal pages are available', function () {
    $this->get(route('privacy'))->assertOk();
    $this->get(route('legal'))->assertOk();
});

test('shared page meta is provided to inertia on marketing pages', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('pageMeta.title')
            ->has('pageMeta.canonical')
            ->where('pageMeta.title', collect(config('seo.pages'))->firstWhere('path', '/')['meta_title'])
        );
});

test('marketing pages include server rendered structured data for contact and services', function () {
    $response = $this->get(route('home'));

    $response->assertOk();

    expect($response->getContent())
        ->toContain('application/ld+json')
        ->toContain('ContactPoint')
        ->toContain('ItemList')
        ->toContain('hasOfferCatalog')
        ->toContain(url('/application-web'))
        ->toContain(config('aristech.email'))
        ->toContain(config('aristech.phone'));
});

test('contact page structured data includes faq and contact page type', function () {
    $response = $this->get(route('contact'));

    expect($response->getContent())
        ->toContain('ContactPage')
        ->toContain('FAQPage')
        ->toContain(config('seo.faqs.0.question'));
});

test('seo services include public paths for rich results', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('seo.services.0.path', '/application-web')
            ->where('seo.services.4.path', '/seo')
        );
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
                && $terms->contains('intégrateur de solutions Guinée')
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
