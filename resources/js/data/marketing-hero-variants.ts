import { superSecuriteImages } from '@/data/super-securite-images';
import { superSecuriteStock } from '@/data/super-securite-stock';
import { contact } from '@/routes';

export type HeroSlideLayout = 'split-right' | 'split-left';

export type HeroSlideTypography = 'underline' | 'gradient' | 'accent-block' | 'split-lines';

export type MarketingHeroVariant = {
    id: string;
    layout: HeroSlideLayout;
    typography: HeroSlideTypography;
    label: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: {
        label: string;
        href: string;
    };
    secondaryCta: {
        label: string;
        href: string;
    };
    image: string;
    imageAlt: string;
    backgroundImage: string;
    stats: readonly {
        label: string;
        value: string;
    }[];
};

export const marketingHeroSlides: readonly MarketingHeroVariant[] = [
    {
        id: 'excellence',
        layout: 'split-right',
        typography: 'underline',
        label: 'Super SÉCURITÉ',
        title: 'Confiez votre sécurité',
        highlight: "à l'excellence",
        description:
            'Sécurité privée à Conakry : gardiennage, sites industriels et miniers, sécurité événementielle. Intervention 24h/24 et 7j/7.',
        primaryCta: {
            label: 'Nous contacter',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'Nos offres',
            href: '#services',
        },
        image: superSecuriteStock.home.welcome,
        imageAlt: 'Super Sécurité — agents de sécurité à Conakry',
        backgroundImage: superSecuriteStock.hero.background,
        stats: [
            { label: 'Disponibilité', value: '24h/24 · 7j/7' },
            { label: 'Zone', value: 'Conakry & Guinée' },
            { label: 'Expertise', value: 'Sécurité privée' },
        ],
    },
    {
        id: 'gardiennage',
        layout: 'split-left',
        typography: 'gradient',
        label: 'Gardiennage & surveillance',
        title: 'Protégez vos locaux',
        highlight: 'en toute confiance',
        description:
            'Agents formés, rondes régulières et reporting pour entreprises, résidences et commerces à Conakry.',
        primaryCta: {
            label: 'Nous contacter',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'Nos offres',
            href: '#services',
        },
        image: `/${superSecuriteStock.home.services.gardiennage}`,
        imageAlt: 'Agent de gardiennage Super Sécurité à Conakry',
        backgroundImage: superSecuriteStock.home.services.gardiennage,
        stats: [
            { label: 'Surveillance', value: 'Continue' },
            { label: 'Zone', value: 'Conakry & régions' },
            { label: 'Équipes', value: 'Formées & certifiées' },
        ],
    },
    {
        id: 'industriel',
        layout: 'split-right',
        typography: 'accent-block',
        label: 'Sites industriels & miniers',
        title: 'Sécurisez vos sites',
        highlight: 'sensibles',
        description:
            'Protection des installations industrielles et minières avec des protocoles adaptés aux environnements à risque.',
        primaryCta: {
            label: 'Demander un devis',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'Nos offres',
            href: '#industriel',
        },
        image: `/${superSecuriteStock.home.services.industriel}`,
        imageAlt: 'Sécurité industrielle Super Sécurité en Guinée',
        backgroundImage: superSecuriteStock.home.services.industriel,
        stats: [
            { label: 'Secteurs', value: 'Industrie & mines' },
            { label: 'Protocoles', value: 'Sur mesure' },
            { label: 'Réactivité', value: '24h/24' },
        ],
    },
    {
        id: 'evenementiel',
        layout: 'split-left',
        typography: 'split-lines',
        label: 'Sécurité événementielle',
        title: 'Vos événements',
        highlight: 'sous contrôle',
        description:
            'Filtrage, gestion des flux et présence discrète pour concerts, conférences et manifestations à Conakry.',
        primaryCta: {
            label: 'Organiser un événement',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'Nos offres',
            href: '#evenementiel',
        },
        image: `/${superSecuriteStock.home.services.evenementiel}`,
        imageAlt: 'Équipe événementielle Super Sécurité',
        backgroundImage: superSecuriteStock.home.services.evenementiel,
        stats: [
            { label: 'Événements', value: 'Publics & privés' },
            { label: 'Équipes', value: 'Mobiles' },
            { label: 'Disponibilité', value: '7j/7' },
        ],
    },
] as const;

export const marketingHeroSlideLabels = marketingHeroSlides.map((slide) => {
    switch (slide.id) {
        case 'excellence':
            return 'Excellence';
        case 'gardiennage':
            return 'Gardiennage';
        case 'industriel':
            return 'Industriel';
        case 'evenementiel':
            return 'Événementiel';
        default:
            return slide.label;
    }
}) as readonly string[];

/** @deprecated Utiliser marketingHeroSlides */
export const marketingHeroVariants = marketingHeroSlides.slice(1);
