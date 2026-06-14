import { Head, Link, router, usePage } from '@inertiajs/react';
import { Images } from 'lucide-react';
import { useGalleryLightbox } from '@/components/marketing/gallery-lightbox';
import MarketingContentImage from '@/components/marketing/marketing-content-image';
import MarketingFullscreenHero from '@/components/marketing/marketing-fullscreen-hero';
import Reveal from '@/components/marketing/reveal';
import SeoHead from '@/components/marketing/seo-head';
import { marketingPageHeroes } from '@/data/marketing-page-heroes';
import { index as galerieIndex } from '@/routes/galerie';
import type {
    GalleryImagePublic,
    GalleryServiceOption,
} from '@/types/gallery';

type PageProps = {
    images: GalleryImagePublic[];
    services: GalleryServiceOption[];
    countsByService: Record<string, number>;
    filters: {
        service: string;
    };
};

export default function MarketingGalleryIndex() {
    const { images, services, countsByService, filters } =
        usePage<PageProps>().props;

    const lightboxImages = images.map((image) => ({
        src: image.src,
        alt: image.alt,
        caption: image.caption,
    }));
    const { openAt, lightbox } = useGalleryLightbox(lightboxImages);

    const totalCount = Object.values(countsByService).reduce(
        (sum, count) => sum + count,
        0,
    );

    const applyServiceFilter = (service: string) => {
        router.get(
            galerieIndex.url(),
            service === 'all' ? {} : { service },
            { preserveState: true, replace: true },
        );
    };

    return (
        <>
            <SeoHead />
            <Head title="Galerie" />

            <MarketingFullscreenHero {...marketingPageHeroes.galerie} />

            <section className="marketing-section-band marketing-below-fold py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="marketing-label mb-2">Filtrer</p>
                            <p className="text-sm text-super-securite-muted">
                                {totalCount} photo{totalCount > 1 ? 's' : ''}{' '}
                                publiée{totalCount > 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => applyServiceFilter('all')}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                    filters.service === 'all'
                                        ? 'border-super-securite-accent bg-super-securite-accent text-white'
                                        : 'border-super-securite-border bg-white text-super-securite-heading hover:border-super-securite-accent/40'
                                }`}
                            >
                                Tous ({totalCount})
                            </button>
                            <button
                                type="button"
                                onClick={() => applyServiceFilter('general')}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                    filters.service === 'general'
                                        ? 'border-super-securite-accent bg-super-securite-accent text-white'
                                        : 'border-super-securite-border bg-white text-super-securite-heading hover:border-super-securite-accent/40'
                                }`}
                            >
                                Galerie générale (
                                {countsByService.general ?? 0})
                            </button>
                            {services.map((service) => (
                                <button
                                    key={service.value}
                                    type="button"
                                    onClick={() =>
                                        applyServiceFilter(service.value)
                                    }
                                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                        filters.service === service.value
                                            ? 'border-super-securite-accent bg-super-securite-accent text-white'
                                            : 'border-super-securite-border bg-white text-super-securite-heading hover:border-super-securite-accent/40'
                                    }`}
                                >
                                    {service.label} (
                                    {countsByService[service.value] ?? 0})
                                </button>
                            ))}
                        </div>
                    </div>

                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {images.map((image, index) => (
                                <Reveal key={image.id} delay={index * 40}>
                                    <figure className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-slate-900/5">
                                        <button
                                            type="button"
                                            onClick={() => openAt(index)}
                                            className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
                                            aria-label={`Agrandir : ${image.alt}`}
                                        >
                                            <MarketingContentImage
                                                src={image.src}
                                                source={image.image_source}
                                                alt={image.alt}
                                                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <span className="absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                                                {image.service_label}
                                            </span>
                                        </button>
                                        <figcaption className="space-y-2 px-3 py-3">
                                            <p className="font-heading text-sm font-semibold text-super-securite-heading">
                                                {image.alt}
                                            </p>
                                            {image.caption ? (
                                                <p className="text-xs leading-snug text-super-securite-muted">
                                                    {image.caption}
                                                </p>
                                            ) : null}
                                            {image.service_path ? (
                                                <Link
                                                    href={image.service_path}
                                                    className="inline-flex text-xs font-semibold text-super-securite-accent hover:underline"
                                                >
                                                    Voir le service
                                                </Link>
                                            ) : null}
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="marketing-card flex flex-col items-center gap-3 py-16 text-center">
                            <Images className="size-10 text-super-securite-muted" />
                            <p className="text-super-securite-muted">
                                Aucune image disponible pour ce filtre.
                            </p>
                        </div>
                    )}
                </div>
            </section>
            {lightbox}
        </>
    );
}
