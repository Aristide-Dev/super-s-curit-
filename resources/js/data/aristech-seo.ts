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
        focusKeyword: 'aristech',
        title:
            'ArisTech Guinée — Agence web Conakry | Sites internet & e-commerce sur mesure',
        description:
            'ArisTech, agence web basée à Conakry (Guinée) : création de sites internet sur mesure, applications web et boutiques en ligne. Aristide Gnimassou, fondateur. Devis gratuit sous 24 h.',
        path: '/',
        image: aristechImages.ogDefault,
        keywords: aristechMetaKeywords.home,
        schemaType: 'WebPage',
        breadcrumbs: [{ name: 'Accueil', path: '/' }],
    },
    about: {
        focusKeyword: 'aristech guinée',
        title:
            'ArisTech Guinée | À propos — Aristide Gnimassou, développeur web à Conakry',
        description:
            'ArisTech est une agence web fondée à Conakry par Aristide Gnimassou. Développement de sites internet, applications web et e-commerce pour PME, institutions et startups en Guinée et à l\'international.',
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
        focusKeyword: 'contacter aristech guinée',
        title:
            'Contacter ArisTech Guinée | Devis gratuit — Site internet & application à Conakry',
        description:
            'Contactez ArisTech à Conakry (Guinée) pour un devis gratuit : site internet, application web ou boutique en ligne. Aristide Gnimassou vous répond sous 24 h avec un cadrage technique détaillé.',
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
