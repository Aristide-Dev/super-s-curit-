<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PublicContentSort
{
    public const SORT_BY_PUBLISHED_AT = 'published_at';

    public const SORT_BY_VIEWS = 'views';

    /**
     * @return array{sort_by: string, sort_direction: string}
     */
    public static function apply(Builder $query, Request $request): array
    {
        $sortBy = $request->string('sort_by', self::SORT_BY_PUBLISHED_AT)->toString();
        $sortDirection = $request->string('sort_direction', 'desc')->toString();

        if (! in_array($sortBy, [self::SORT_BY_PUBLISHED_AT, self::SORT_BY_VIEWS], true)) {
            $sortBy = self::SORT_BY_PUBLISHED_AT;
        }

        if (! in_array($sortDirection, ['asc', 'desc'], true)) {
            $sortDirection = 'desc';
        }

        $query->orderBy($sortBy, $sortDirection);

        if ($sortBy === self::SORT_BY_VIEWS) {
            $query->orderByDesc(self::SORT_BY_PUBLISHED_AT);
        }

        return [
            'sort_by' => $sortBy,
            'sort_direction' => $sortDirection,
        ];
    }
}
