import {
    aristechServiceById,
    type AristechServiceId,
} from '@/data/aristech-services';
import type { SeoPageKey } from '@/data/aristech-seo';

export type ServicePageContent = {
    seoPage: SeoPageKey;
    label: string;
    title: string;
    highlightedTitle: string;
    description: string;
    image: string;
    imageAlt: string;
    benefits: string[];
    sections: {
        title: string;
        description: string;
    }[];
};

function toServicePageContent(id: AristechServiceId): ServicePageContent {
    const service = aristechServiceById[id];

    return {
        seoPage: id,
        label: service.pageLabel,
        title: service.pageTitle,
        highlightedTitle: service.pageHighlight,
        description: service.pageDescription,
        image: service.cover,
        imageAlt: service.imageAlt,
        benefits: [...service.benefits],
        sections: service.sections.map((section) => ({ ...section })),
    };
}

export const aristechServicePages: Record<
    AristechServiceId,
    ServicePageContent
> = {
    applicationWeb: toServicePageContent('applicationWeb'),
    creationSite: toServicePageContent('creationSite'),
    woocommerce: toServicePageContent('woocommerce'),
    integrateurSolutions: toServicePageContent('integrateurSolutions'),
    seo: toServicePageContent('seo'),
};
