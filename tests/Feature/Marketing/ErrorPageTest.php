<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    Route::get('/test-error-503', fn () => abort(503));
});

test('unknown marketing routes render the branded 404 page', function () {
    $response = $this->get('/page-inexistante-super-securite');

    $response
        ->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page
            ->component('errors/404')
            ->where('status', 404)
            ->has('superSecurite')
            ->has('superSecurite.phone')
        );

    expect($response->getContent())->toContain('superSecurite');
});

test('forbidden admin routes render the branded 403 page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('candidatures-agents.index'))
        ->assertForbidden()
        ->assertInertia(fn (Assert $page) => $page
            ->component('errors/403')
            ->where('status', 403)
        );
});

test('service unavailable responses render the branded 503 page', function () {
    $this->get('/test-error-503')
        ->assertServiceUnavailable()
        ->assertInertia(fn (Assert $page) => $page
            ->component('errors/503')
            ->where('status', 503)
        );
});

test('json requests keep default error responses', function () {
    $this->getJson('/page-inexistante-super-securite')
        ->assertNotFound()
        ->assertJsonStructure(['message']);
});
