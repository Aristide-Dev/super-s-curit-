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

test('public articles index can be sorted by views', function () {
    $lowViews = Article::factory()->create(['views' => 10, 'title' => 'Peu lu']);
    $highViews = Article::factory()->create(['views' => 500, 'title' => 'Très lu']);

    $this->get(route('actualites.index', [
        'sort_by' => 'views',
        'sort_direction' => 'desc',
    ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('articles.data.0.slug', $highViews->slug)
            ->where('articles.data.1.slug', $lowViews->slug)
            ->where('filters.sort_by', 'views')
            ->where('filters.sort_direction', 'desc')
        );
});

test('public articles index can be sorted by publication date ascending', function () {
    $older = Article::factory()->create([
        'title' => 'Plus ancien',
        'published_at' => now()->subDays(10),
    ]);
    $newer = Article::factory()->create([
        'title' => 'Plus récent',
        'published_at' => now()->subDay(),
    ]);

    $this->get(route('actualites.index', [
        'sort_by' => 'published_at',
        'sort_direction' => 'asc',
    ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('articles.data.0.slug', $older->slug)
            ->where('articles.data.1.slug', $newer->slug)
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
