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
        title: 'ArisTech | Agence Web & Applications à Conakry, Guinée',
        description:
            'ArisTech, agence web à Conakry en Guinée : création de sites internet sur mesure, applications web, sites WordPress et boutiques WooCommerce. Devis gratuit sous 24 h.',
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
            'ArisTech est une agence digitale à Conakry fondée par Aristide Gnimassou. Développement web, sites sur mesure, refonte et e-commerce pour PME, institutions et startups en Guinée.',
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
        focusKeyword: 'prix création site web Guinée',
        title: 'Devis site web Guinée | Contacter ArisTech à Conakry',
        description:
            "Contactez ArisTech à Conakry pour connaître le prix d'un site web en Guinée : site internet, application web, WordPress ou boutique WooCommerce. Devis gratuit sous 24 h.",
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
