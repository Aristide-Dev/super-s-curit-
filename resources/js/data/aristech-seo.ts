import { aristechImages } from '@/data/aristech-images';
import {
    aristechServiceById,
    type AristechServiceId,
} from '@/data/aristech-services';
import { aristechMetaKeywords } from '@/data/aristech-search-terms';

export type SeoPageKey = 'home' | 'about' | AristechServiceId | 'contact';

export type SeoSchemaPageType = 'WebPage' | 'AboutPage' | 'ContactPage';

export type SeoBreadcrumb = {
    name: string;
    path: string;
};

export type SeoPageMeta = {
    focusKeyword: string;
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: 'website' | 'article';
    keywords?: string;
    schemaType: SeoSchemaPageType;
    breadcrumbs: SeoBreadcrumb[];
};

function serviceSeoMeta(id: AristechServiceId): SeoPageMeta {
    const service = aristechServiceById[id];

    return {
        focusKeyword: service.focusKeyword,
        title: service.metaTitle,
        description: service.metaDescription,
        path: service.path,
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords[id],
        schemaType: 'WebPage',
        breadcrumbs: [
            { name: 'Accueil', path: '/' },
            { name: service.title, path: service.path },
        ],
    };
}

export const aristechSeoPages: Record<SeoPageKey, SeoPageMeta> = {
    home: {
        focusKeyword: 'agence web Conakry',
        title: 'ArisTech | Agence Web & Applications à Conakry, Guinée',
        description:
            'ArisTech, agence web à Conakry en Guinée : création de sites internet sur mesure, applications web & mobile, boutiques en ligne et intégration de solutions. Devis gratuit sous 24 h.',
        path: '/',
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords.home,
        schemaType: 'WebPage',
        breadcrumbs: [{ name: 'Accueil', path: '/' }],
    },
    about: {
        focusKeyword: 'développeur web Guinée',
        title: 'ArisTech Guinée | Développeur web & agence digitale à Conakry',
        description:
            'ArisTech est une agence digitale à Conakry fondée par Aristide Gnimassou. Sites internet, applications web & mobile, e-commerce et intégration de solutions pour PME et startups en Guinée.',
        path: '/a-propos',
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords.about,
        schemaType: 'AboutPage',
        breadcrumbs: [
            { name: 'Accueil', path: '/' },
            { name: 'À propos', path: '/a-propos' },
        ],
    },
    applicationWeb: serviceSeoMeta('applicationWeb'),
    creationSite: serviceSeoMeta('creationSite'),
    woocommerce: serviceSeoMeta('woocommerce'),
    integrateurSolutions: serviceSeoMeta('integrateurSolutions'),
    seo: serviceSeoMeta('seo'),
    contact: {
        focusKeyword: 'prix création site web Guinée',
        title: 'Devis site web Guinée | Contacter ArisTech à Conakry',
        description:
            'Contactez ArisTech à Conakry pour un devis : création de site internet, application web & mobile, boutique en ligne ou intégration de solutions en Guinée. Réponse sous 24 h.',
        path: '/contact',
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords.contact,
        schemaType: 'ContactPage',
        breadcrumbs: [
            { name: 'Accueil', path: '/' },
            { name: 'Contact', path: '/contact' },
        ],
    },
};
