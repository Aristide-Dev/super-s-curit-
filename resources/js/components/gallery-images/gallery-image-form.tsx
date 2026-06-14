import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { GalleryServiceOption } from '@/types/gallery';

type GalleryImageFormData = {
    service_id: string | null;
    alt: string;
    caption: string | null;
    sort_order: number;
    is_published: boolean;
    image_url?: string | null;
};

type GalleryImageFormProps = {
    submitUrl: string;
    submitLabel: string;
    cancelHref: string;
    services: GalleryServiceOption[];
    errors: Record<string, string>;
    galleryImage?: GalleryImageFormData;
    method?: 'post' | 'put';
};

export default function GalleryImageForm({
    submitUrl,
    submitLabel,
    cancelHref,
    services,
    errors,
    galleryImage,
    method = 'post',
}: GalleryImageFormProps) {
    return (
        <Form
            action={submitUrl}
            method={method === 'put' ? 'post' : 'post'}
            encType="multipart/form-data"
            className="space-y-6 rounded-xl border bg-card p-6"
        >
            {method === 'put' ? (
                <input type="hidden" name="_method" value="put" />
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="service_id">Rattachement</Label>
                    <select
                        id="service_id"
                        name="service_id"
                        defaultValue={
                            galleryImage?.service_id ?? 'general'
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="general">Galerie générale uniquement</option>
                        {services.map((service) => (
                            <option key={service.value} value={service.value}>
                                {service.label}
                            </option>
                        ))}
                    </select>
                    <p className="text-muted-foreground text-xs">
                        Laissez « Galerie générale » pour une image visible
                        uniquement sur la page /galerie.
                    </p>
                    {errors.service_id ? (
                        <p className="text-sm text-destructive">{errors.service_id}</p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sort_order">Ordre d’affichage</Label>
                    <Input
                        id="sort_order"
                        name="sort_order"
                        type="number"
                        min={0}
                        defaultValue={galleryImage?.sort_order ?? 0}
                    />
                    {errors.sort_order ? (
                        <p className="text-sm text-destructive">{errors.sort_order}</p>
                    ) : null}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">
                    Image {method === 'put' ? '(laisser vide pour conserver)' : ''}
                </Label>
                {galleryImage?.image_url ? (
                    <img
                        src={galleryImage.image_url}
                        alt={galleryImage.alt}
                        className="mb-3 h-40 w-auto max-w-full rounded-lg border object-cover"
                    />
                ) : null}
                <Input id="image" name="image" type="file" accept="image/*" />
                {errors.image ? (
                    <p className="text-sm text-destructive">{errors.image}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="alt">Texte alternatif</Label>
                <Input
                    id="alt"
                    name="alt"
                    defaultValue={galleryImage?.alt ?? ''}
                    required
                />
                {errors.alt ? (
                    <p className="text-sm text-destructive">{errors.alt}</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <Label htmlFor="caption">Légende</Label>
                <Textarea
                    id="caption"
                    name="caption"
                    rows={3}
                    defaultValue={galleryImage?.caption ?? ''}
                />
                {errors.caption ? (
                    <p className="text-sm text-destructive">{errors.caption}</p>
                ) : null}
            </div>

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    name="is_published"
                    value="1"
                    defaultChecked={galleryImage?.is_published ?? true}
                    className="size-4 rounded border-input"
                />
                Publier sur le site
            </label>

            <div className="flex flex-wrap gap-3">
                <Button type="submit">{submitLabel}</Button>
                <Button type="button" variant="outline" asChild>
                    <a href={cancelHref}>Annuler</a>
                </Button>
            </div>
        </Form>
    );
}
