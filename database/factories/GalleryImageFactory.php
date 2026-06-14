<?php

namespace Database\Factories;

use App\Enums\ServiceId;
use App\Models\GalleryImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GalleryImage>
 */
class GalleryImageFactory extends Factory
{
    protected $model = GalleryImage::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_id' => ServiceId::Entreprise,
            'image' => '/images/super-securite/services/IMG_9598.jpg',
            'alt' => 'Agent de sécurité Super Sécurité',
            'caption' => 'Surveillance de site professionnel',
            'sort_order' => 0,
            'is_published' => true,
        ];
    }

    public function unpublished(): static
    {
        return $this->state(fn (): array => [
            'is_published' => false,
        ]);
    }

    public function general(): static
    {
        return $this->state(fn (): array => [
            'service_id' => null,
        ]);
    }
}
