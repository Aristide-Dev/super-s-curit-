<?php

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Seo\SitemapEntries;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('public can view published articles index', function () {
    Article::factory()->count(2)->create();
    Article::factory()->draft()->create();
    Article::factory()->pendingApproval()->create();

    $this->get(route('actualites.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('marketing/articles/index')
            ->has('articles.data', 2)
        );
});

test('public can view a published article', function () {
    $article = Article::factory()->create([
        'title' => 'Article public test',
        'views' => 0,
    ]);

    $this->get(route('actualites.show', $article->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('marketing/articles/show')
            ->where('article.slug', $article->slug)
            ->has('articleContent')
        );

    expect($article->fresh()->views)->toBe(1);
});

test('draft articles are not accessible publicly', function () {
    $article = Article::factory()->draft()->create();

    $this->get(route('actualites.show', $article->slug))
        ->assertNotFound();
});

test('pending approval articles are not accessible publicly', function () {
    $article = Article::factory()->pendingApproval()->create();

    $this->get(route('actualites.show', $article->slug))
        ->assertNotFound();
});

test('rejected articles are not accessible publicly', function () {
    $article = Article::factory()->rejected()->create();

    $this->get(route('actualites.show', $article->slug))
        ->assertNotFound();
});

test('actualites page has seo metadata configured', function () {
    $this->get(route('actualites.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('pageMeta.path', '/actualites')
            ->where('pageMeta.title', fn ($title) => str_contains($title, 'Actualités'))
        );
});

test('only published articles appear in sitemap entries', function () {
    $published = Article::factory()->create([
        'title' => 'Article pour sitemap',
        'status' => ArticleStatus::Published,
    ]);
    Article::factory()->pendingApproval()->create();

    $entries = SitemapEntries::all();
    $paths = collect($entries)->pluck('path')->all();

    expect($paths)->toContain('/actualites/'.$published->slug);
});
