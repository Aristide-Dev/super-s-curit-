<?php

namespace App\Support;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\User;

class ArticleStatusTransition
{
    public function apply(Article $article, ArticleStatus $status, User $actor): void
    {
        $previous = $article->status;

        if ($status === ArticleStatus::PendingApproval && $previous !== ArticleStatus::PendingApproval) {
            $article->submitted_at = now();
        }

        if ($status === ArticleStatus::Published) {
            $article->approved_by_id = $actor->id;
            $article->approved_at = now();
            $article->rejected_by_id = null;
            $article->rejected_at = null;

            if ($article->published_at === null) {
                $article->published_at = now();
            }
        }

        if ($status === ArticleStatus::Rejected) {
            $article->rejected_by_id = $actor->id;
            $article->rejected_at = now();
        }

        if ($status === ArticleStatus::Draft) {
            $article->rejected_by_id = null;
            $article->rejected_at = null;
        }

        $article->status = $status;
    }
}
