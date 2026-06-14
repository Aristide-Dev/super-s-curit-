<?php

namespace App\Models;

use App\Enums\ServiceId;
use App\Support\MarketingMediaUrl;
use Database\Factories\GalleryImageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'service_id',
    'image',
    'alt',
    'caption',
    'sort_order',
    'is_published',
])]
class GalleryImage extends Model
{
    /** @use HasFactory<GalleryImageFactory> */
    use HasFactory, SoftDeletes;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'service_id' => ServiceId::class,
            'sort_order' => 'integer',
            'is_published' => 'boolean',
        ];
    }

    /**
     * @param  Builder<GalleryImage>  $query
     * @return Builder<GalleryImage>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    /**
     * @param  Builder<GalleryImage>  $query
     * @return Builder<GalleryImage>
     */
    public function scopeForService(Builder $query, ServiceId|string $serviceId): Builder
    {
        $value = $serviceId instanceof ServiceId ? $serviceId->value : $serviceId;

        return $query->where('service_id', $value);
    }

    /**
     * @param  Builder<GalleryImage>  $query
     * @return Builder<GalleryImage>
     */
    public function scopeGeneral(Builder $query): Builder
    {
        return $query->whereNull('service_id');
    }

    /**
     * @param  Builder<GalleryImage>  $query
     * @return Builder<GalleryImage>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    public function getImageUrlAttribute(): ?string
    {
        return MarketingMediaUrl::resolve($this->image);
    }

    public function getImageSourceAttribute(): ?string
    {
        return MarketingMediaUrl::source($this->image);
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'id' => $this->id,
            'service_id' => $this->service_id?->value,
            'service_label' => $this->service_id?->label() ?? 'Galerie générale',
            'service_path' => $this->service_id?->path(),
            'src' => $this->image_url,
            'alt' => $this->alt,
            'caption' => $this->caption,
            'image_source' => $this->image_source,
            'sort_order' => $this->sort_order,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toAdminArray(): array
    {
        return [
            ...$this->toPublicArray(),
            'image' => $this->image,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at?->toIso8601String(),
            'created_at_formatted' => $this->created_at?->locale('fr')->isoFormat('D MMM YYYY à HH:mm'),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'updated_at_formatted' => $this->updated_at?->locale('fr')->isoFormat('D MMM YYYY à HH:mm'),
        ];
    }
}
