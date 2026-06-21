import { Head, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Images } from 'lucide-react';
import { useEffect, useState } from 'react';
import GalleryBentoGrid from '@/components/marketing/gallery-bento-grid';
import { useGalleryLightbox } from '@/components/marketing/gallery-lightbox';
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

    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        setSlideIndex(0);
    }, [images]);

    useEffect(() => {
        if (images.length <= 1) {
            return;
        }
        const interval = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

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

            <section className="marketing-hero-cinematic relative overflow-hidden">
                <div className="relative mx-auto flex min-h-[90dvh] w-full max-w-[1920px] items-end overflow-hidden lg:items-center">
                    {images.length > 0 ? (
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.img
                                key={slideIndex}
                                src={images[slideIndex].src}
                                alt={images[slideIndex].alt}
                                width={1920}
                                height={1080}
                                fetchPriority="high"
                                loading="eager"
                                decoding="async"
                                className="absolute inset-0 size-full max-w-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                            />
                        </AnimatePresence>
                    ) : (
                        <img
                            src={marketingPageHeroes.galerie.image}
                            alt={marketingPageHeroes.galerie.imageAlt}
                            width={1920}
                            height={1080}
                            fetchPriority="high"
                            loading="eager"
                            decoding="async"
                            className="absolute inset-0 size-full max-w-full object-cover"
                        />
                    )}

                    <div
                        className="marketing-hero-overlay-base pointer-events-none absolute inset-0"
                        aria-hidden
                    />
                    <div
                        className="absolute inset-y-0 left-0 w-1 bg-super-securite-accent sm:w-1.5"
                        aria-hidden
                    />
                </div>
            </section>

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
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filters.service === 'all'
                                    ? 'border-super-securite-accent bg-super-securite-accent text-white'
                                    : 'border-super-securite-border bg-white text-super-securite-heading hover:border-super-securite-accent/40'
                                    }`}
                            >
                                Tous ({totalCount})
                            </button>
                            <button
                                type="button"
                                onClick={() => applyServiceFilter('general')}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filters.service === 'general'
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
                                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filters.service === service.value
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
                        <GalleryBentoGrid
                            images={images}
                            onImageClick={openAt}
                        />
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
