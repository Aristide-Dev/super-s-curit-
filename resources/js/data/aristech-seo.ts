import { aristechImages } from '@/data/aristech-images';

export type SeoPageKey = 'home' | 'about' | 'contact';

export type SeoPageMeta = {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: 'website' | 'article';
    keywords?: string;
};

export const aristechSeoPages: Record<SeoPageKey, SeoPageMeta> = {
    home: {
        title: 'ArisTech — Développement web, WordPress & e-commerce en Guinée',
        description:
            'ArisTech conçoit des sites WordPress, boutiques WooCommerce, applications web et mobiles sur mesure. Studio basé en Guinée, clients en Afrique et à l\'international.',
        path: '/',
        image: aristechImages.ogDefault,
        keywords:
            'développement web Guinée, WordPress, WooCommerce, Shopify, site internet Conakry, application mobile, ArisTech',
    },
    about: {
        title: 'À propos — ArisTech | Studio web & mobile en Guinée',
        description:
            'Découvrez ArisTech : histoire, valeurs et méthode de travail. Studio fondé par Aristide Gnimassou, spécialisé WordPress, e-commerce et produits numériques sur mesure.',
        path: '/a-propos',
        image: aristechImages.ogDefault,
        keywords:
            'à propos ArisTech, agence web Guinée, développeur WordPress, Aristide Gnimassou',
    },
    contact: {
        title: 'Contact — ArisTech | Devis site web & application',
        description:
            'Contactez ArisTech pour votre projet WordPress, boutique en ligne ou application. Réponse sous 24 h ouvrées — devis et cadrage technique gratuit.',
        path: '/contact',
        image: aristechImages.ogDefault,
        keywords:
            'contact ArisTech, devis site web Guinée, projet WordPress, développement sur mesure',
    },
};
