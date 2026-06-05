<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Article::query()->published();

        if ($request->filled('category') && $request->string('category')->toString() !== 'all') {
            $query->where('category', $request->string('category')->toString());
        }

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where('title', 'like', '%'.$search.'%');
        }

        $articles = $query
            ->orderByDesc('published_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Article $article) => $article->toPublicArray());

        $categories = Article::query()
            ->published()
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->values()
            ->all();

        $featuredArticles = Article::query()
            ->published()
            ->where('featured', true)
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Article $article) => $article->toPublicArray())
            ->values()
            ->all();

        return Inertia::render('marketing/articles/index', [
            'articles' => $articles,
            'featuredArticles' => $featuredArticles,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show(Article $article): Response
    {
        abort_unless($article->isPublished(), 404);

        $article->increment('views');
        $article->refresh();

        $relatedArticles = Article::query()
            ->published()
            ->where('id', '!=', $article->id)
            ->when(
                $article->category !== null,
                fn ($query) => $query->where('category', $article->category),
            )
            ->orderByDesc('published_at')
            ->limit(3)
            ->get()
            ->map(fn (Article $related) => $related->toPublicArray())
            ->values()
            ->all();

        return Inertia::render('marketing/articles/show', [
            'article' => $article->toPublicArray(),
            'articleContent' => $article->content,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
