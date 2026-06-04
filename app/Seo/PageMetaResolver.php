<?php

namespace App\Seo;

use Illuminate\Http\Request;

class PageMetaResolver
{
    public function __construct(private SeoPageRegistry $registry) {}

    /**
     * @return array{
     *     title: string,
     *     description: string,
     *     canonical: string,
     *     robots: string,
     *     og_image: string,
     *     og_type: string,
     *     path: string,
     *     schema_type: string,
     * }
     */
    public function resolve(Request $request): array
    {
        return $this->registry->resolve($request);
    }
}
