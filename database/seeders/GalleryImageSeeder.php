<?php

namespace Database\Seeders;

use App\Models\GalleryImage;
use Illuminate\Database\Seeder;

class GalleryImageSeeder extends Seeder
{
    public function run(): void
    {
        /** @var list<array<string, mixed>> $images */
        $images = require __DIR__.'/data/gallery-images.php';

        foreach ($images as $image) {
            GalleryImage::query()->updateOrCreate(
                [
                    'service_id' => $image['service_id'],
                    'alt' => $image['alt'],
                ],
                [
                    'image' => $image['image'],
                    'caption' => $image['caption'],
                    'sort_order' => $image['sort_order'],
                    'is_published' => true,
                ],
            );
        }
    }
}
