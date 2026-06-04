<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyController extends Controller
{
    public function show(Request $request, string $slug): Response
    {
        $study = collect(config('seo.case_studies', []))->firstWhere('slug', $slug);

        abort_unless($study !== null, 404);

        return Inertia::render('marketing/case-study', [
            'study' => $study,
        ]);
    }
}
