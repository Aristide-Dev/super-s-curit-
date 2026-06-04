<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CaseStudyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\TrackVisit;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;

Route::get('/robots.txt', RobotsController::class)
    ->name('robots')
    ->withoutMiddleware([
        TrackVisit::class,
        HandleInertiaRequests::class,
        AddLinkHeadersForPreloadedAssets::class,
    ]);

Route::get('/sitemap.xml', SitemapController::class)
    ->name('sitemap')
    ->withoutMiddleware([
        TrackVisit::class,
        HandleInertiaRequests::class,
        AddLinkHeadersForPreloadedAssets::class,
    ]);

Route::inertia('/', 'marketing/home')->name('home');
Route::inertia('/a-propos', 'marketing/about')->name('about');
Route::redirect('/site-wordpress', '/creation-site', 301);
Route::inertia('/creation-site', 'marketing/creation-site')->name('creation-site');
Route::inertia('/integrateur-solutions', 'marketing/integrateur-solutions')->name('integrateur-solutions');
Route::inertia('/woocommerce', 'marketing/woocommerce')->name('woocommerce');
Route::inertia('/application-web', 'marketing/application-web')->name('application-web');
Route::inertia('/seo', 'marketing/referencement-seo')->name('seo');
Route::inertia('/contact', 'marketing/contact')->name('contact');
Route::inertia('/realisations', 'marketing/realisations')->name('realisations');
Route::get('/realisations/{slug}', [CaseStudyController::class, 'show'])->name('realisations.show');
Route::inertia('/politique-de-confidentialite', 'marketing/privacy')->name('privacy');
Route::inertia('/mentions-legales', 'marketing/legal')->name('legal');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::post('/analytics/duration', [AnalyticsController::class, 'updateDuration'])->name('analytics.duration');
Route::get('/analytics/duration', fn () => redirect()->route('analytics.index'));

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::middleware('admin')->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
        Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
    });
});

require __DIR__.'/settings.php';
