import { aristechImages } from '@/data/aristech-images';
import { aristechMetaKeywords } from '@/data/aristech-search-terms';

export type SeoPageKey = 'home' | 'about' | 'contact';

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

export const aristechSeoPages: Record<SeoPageKey, SeoPageMeta> = {
    home: {
        focusKeyword: 'agence web Conakry',
        title:
            'Agence web Conakry — Création de site internet & e-commerce | ArisTech',
        description:
            'ArisTech, agence web à Conakry : sites internet sur mesure, applications web et boutiques en ligne (WooCommerce, Shopify). Devis gratuit sous 24 h, SEO, performances et maintenance en Guinée.',
        path: '/',
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords.home,
        schemaType: 'WebPage',
        breadcrumbs: [{ name: 'Accueil', path: '/' }],
    },
    about: {
        focusKeyword: 'développeur web Guinée',
        title:
            'À propos — Agence web & développement sur mesure en Guinée | ArisTech',
        description:
            'ArisTech, studio web à Conakry fondé par Aristide Gnimassou : création de sites internet, applications web et e-commerce (WordPress/WooCommerce). Accompagnement PME et startups en Guinée et à l\'international.',
        path: '/a-propos',
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords.about,
        schemaType: 'AboutPage',
        breadcrumbs: [
            { name: 'Accueil', path: '/' },
            { name: 'À propos', path: '/a-propos' },
        ],
    },
    contact: {
        focusKeyword: 'devis site web Guinée',
        title:
            'Devis site web Guinée — Site internet, app & e-commerce | ArisTech',
        description:
            'Demandez un devis gratuit : site internet, application web ou boutique en ligne (WooCommerce/Shopify) à Conakry. Réponse sous 24 h, cadrage technique et planning de livraison.',
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
