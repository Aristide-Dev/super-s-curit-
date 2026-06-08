import {
    superSecuriteServiceById,
    type SuperSecuriteServiceGalleryImage,
    type SuperSecuriteServiceHero,
    type SuperSecuriteServiceId,
    type SuperSecuriteServiceSection,
} from '@/data/super-securite-services';

export type ServicePageContent = {
    hero: SuperSecuriteServiceHero;
    intro: readonly string[];
    benefits: readonly string[];
    sections: readonly SuperSecuriteServiceSection[];
    includes: readonly string[];
    gallery: readonly SuperSecuriteServiceGalleryImage[];
    galleryTitle: string;
    galleryDescription: string;
};

function toServicePageContent(id: SuperSecuriteServiceId): ServicePageContent {
    const service = superSecuriteServiceById[id];

    return {
        hero: service.hero,
        intro: service.intro,
        benefits: service.benefits,
        sections: service.sections,
        includes: service.includes,
        gallery: service.gallery,
        galleryTitle: service.galleryTitle,
        galleryDescription: service.galleryDescription,
    };
}

export const superSecuriteServicePages: Record<
    SuperSecuriteServiceId,
    ServicePageContent
> = {
    entreprise: toServicePageContent('entreprise'),
    residence: toServicePageContent('residence'),
    chantiers: toServicePageContent('chantiers'),
    'zones-minieres': toServicePageContent('zones-minieres'),
};
