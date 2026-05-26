<?php

use App\Models\User;
use App\Models\Visit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('home page visit is recorded', function () {
    $this->get('/');

    expect(Visit::query()->where('path', '/')->count())->toBe(1);
});

test('bots are flagged but still recorded', function () {
    $this->withHeaders([
        'User-Agent' => 'Googlebot/2.1 (+http://www.google.com/bot.html)',
    ])->get('/');

    expect(Visit::query()->where('is_bot', true)->count())->toBeGreaterThan(0);
});

test('sitemap and robots are not tracked', function () {
    $this->get('/sitemap.xml');
    $this->get('/robots.txt');

    expect(Visit::query()->count())->toBe(0);
});

test('guest cannot access analytics', function () {
    $this->get(route('analytics.index'))->assertRedirect(route('login'));
});

test('regular user cannot access analytics', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('analytics.index'))
        ->assertForbidden();
});

test('admin can access analytics dashboard', function () {
    $admin = User::factory()->admin()->create();

    Visit::factory()->count(5)->create(['is_bot' => false]);

    $this->actingAs($admin)
        ->get(route('analytics.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('analytics/index')
            ->has('kpis')
            ->has('chartData')
            ->has('topPages')
            ->has('countries')
        );
});

test('analytics includes country breakdown', function () {
    $admin = User::factory()->admin()->create();

    Visit::factory()->create([
        'is_bot' => false,
        'country_code' => 'GN',
        'country' => 'Guinée',
    ]);
    Visit::factory()->count(2)->create([
        'is_bot' => false,
        'country_code' => 'FR',
        'country' => 'France',
    ]);

    $this->actingAs($admin)
        ->get(route('analytics.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('countries.0.country_code', 'FR')
            ->where('countries.0.views', 2)
            ->where('countries.1.country_code', 'GN')
        );
});

test('login page is not tracked', function () {
    $this->get('/login');

    expect(Visit::query()->count())->toBe(0);
});

test('admin and app pages are not tracked', function () {
    $admin = User::factory()->admin()->create();
    $user = User::factory()->create();

    $this->actingAs($admin)->get('/dashboard');
    $this->actingAs($admin)->get(route('analytics.index'));
    $this->actingAs($admin)->get(route('users.index'));
    $this->actingAs($user)->get(route('profile.edit'));

    expect(Visit::query()->count())->toBe(0);
});

test('duration endpoint ignores admin paths', function () {
    $visit = Visit::factory()->create([
        'path' => '/dashboard',
        'is_bounce' => true,
        'duration_seconds' => null,
    ]);

    $this->postJson(route('analytics.duration'), [
        'visitor_uuid' => $visit->visitor_uuid,
        'path' => '/dashboard',
        'duration' => 120,
    ])->assertOk();

    expect($visit->fresh()->duration_seconds)->toBeNull();
});

test('geoip resolves country from cloudflare header', function () {
    $this->withHeaders(['CF-IPCountry' => 'GN'])->get('/');

    $visit = Visit::query()->first();

    expect($visit)->not->toBeNull()
        ->and($visit->country_code)->toBe('GN')
        ->and($visit->country)->not->toBeEmpty();
});

test('duration endpoint updates visit by visitor uuid', function () {
    $visit = Visit::factory()->create([
        'path' => '/test',
        'is_bounce' => true,
        'duration_seconds' => null,
    ]);

    $this->postJson(route('analytics.duration'), [
        'visitor_uuid' => $visit->visitor_uuid,
        'path' => '/test',
        'duration' => 120,
    ])->assertOk()->assertJson(['ok' => true]);

    expect($visit->fresh()->duration_seconds)->toBe(120)
        ->and($visit->fresh()->is_bounce)->toBeFalse();
});

test('duration endpoint falls back to session id', function () {
    $visit = Visit::factory()->create([
        'path' => '/test',
        'duration_seconds' => null,
    ]);

    $this->postJson(route('analytics.duration'), [
        'session_id' => $visit->session_id,
        'path' => '/test',
        'duration' => 45,
    ])->assertOk();

    expect($visit->fresh()->duration_seconds)->toBe(45);
});

test('duration endpoint targets latest visit when visitor returns to same page', function () {
    $uuid = (string) Str::uuid();

    $first = Visit::factory()->create([
        'visitor_uuid' => $uuid,
        'path' => '/contact',
        'duration_seconds' => 10,
        'created_at' => now()->subMinutes(10),
    ]);

    $second = Visit::factory()->create([
        'visitor_uuid' => $uuid,
        'path' => '/contact',
        'duration_seconds' => null,
        'created_at' => now(),
    ]);

    $this->postJson(route('analytics.duration'), [
        'visitor_uuid' => $uuid,
        'path' => '/contact',
        'duration' => 200,
    ])->assertOk();

    expect($first->fresh()->duration_seconds)->toBe(10)
        ->and($second->fresh()->duration_seconds)->toBe(200);
});

test('analytics filters by page', function () {
    $admin = User::factory()->admin()->create();

    Visit::factory()->count(3)->create(['is_bot' => false, 'path' => '/contact']);
    Visit::factory()->count(5)->create(['is_bot' => false, 'path' => '/a-propos']);

    $this->actingAs($admin)
        ->get(route('analytics.index', ['pages' => ['/contact']]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('kpis.total_views', 3)
            ->where('filters.pages', ['/contact'])
        );
});

test('analytics filters by country', function () {
    $admin = User::factory()->admin()->create();

    Visit::factory()->count(2)->create(['is_bot' => false, 'country_code' => 'FR']);
    Visit::factory()->count(4)->create(['is_bot' => false, 'country_code' => 'GN']);

    $this->actingAs($admin)
        ->get(route('analytics.index', ['countries' => ['FR']]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('kpis.total_views', 2)
            ->where('filters.countries', ['FR'])
        );
});

test('analytics filters by browser and device combined', function () {
    $admin = User::factory()->admin()->create();

    Visit::factory()->create([
        'is_bot' => false,
        'browser' => 'Chrome',
        'device' => 'mobile',
    ]);
    Visit::factory()->count(3)->create([
        'is_bot' => false,
        'browser' => 'Chrome',
        'device' => 'desktop',
    ]);
    Visit::factory()->create([
        'is_bot' => false,
        'browser' => 'Firefox',
        'device' => 'mobile',
    ]);

    $this->actingAs($admin)
        ->get(route('analytics.index', [
            'browsers' => ['Chrome'],
            'devices' => ['desktop'],
        ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('kpis.total_views', 3)
        );
});

test('analytics exposes filter options', function () {
    $admin = User::factory()->admin()->create();

    Visit::factory()->create([
        'is_bot' => false,
        'path' => '/contact',
        'country_code' => 'FR',
        'country' => 'France',
        'browser' => 'Chrome',
    ]);

    $this->actingAs($admin)
        ->get(route('analytics.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('filterOptions.pages')
            ->has('filterOptions.countries')
            ->has('filterOptions.browsers')
            ->where('filterOptions.pages', fn ($pages) => collect($pages)->contains('/contact'))
            ->where('filterOptions.browsers', fn ($browsers) => collect($browsers)->contains('Chrome'))
        );
});
