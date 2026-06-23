import { superSecuriteImages } from '@/data/super-securite-images';
import { superSecuriteStock } from '@/data/super-securite-stock';
import { superSecuriteServices } from '@/data/super-securite-content';
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
    secondaryCta?: {
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

const serviceImages = superSecuriteStock.home.services;

type ServiceSlideConfig = Pick<
    MarketingHeroVariant,
    'layout' | 'typography' | 'title' | 'highlight' | 'stats'
> & {
    description?: string;
    primaryCta?: MarketingHeroVariant['primaryCta'];
    secondaryCta?: MarketingHeroVariant['secondaryCta'] | null;
};

const serviceSlideConfigs: Record<string, ServiceSlideConfig> = {
    entreprise: {
        layout: 'split-left',
        typography: 'accent-block',
        title: 'Sécurité des entreprises et des',
        highlight: 'sites professionnels',
        description:
            "Assurez la protection de vos collaborateurs, visiteurs, équipements et infrastructures grâce à des solutions de sécurité adaptées à vos besoins. Nos agents qualifiés veillent à la sécurité de vos bureaux, commerces, entrepôts, restaurants et sites d'exploitation, 24h/24 et 7j/7.",
        primaryCta: {
            label: 'Découvrir',
            href: '/entreprise',
        },
        secondaryCta: null,
        stats: [
            { label: 'Surveillance', value: '24h/24 • 7j/7' },
            { label: 'Couverture', value: 'Conakry & Toute la Guinée' },
            { label: 'Professionnalisme', value: 'Agents qualifiés et encadrés' },
        ],
    },
    chantiers: {
        layout: 'split-left',
        typography: 'accent-block',
        title: 'Sécurisez vos chantiers,',
        highlight: 'protégez vos investissements',
        description:
            'Super Sécurité assure la protection de vos chantiers de construction grâce à des agents qualifiés, un contrôle rigoureux des accès et des rondes régulières. Prévenez les vols, les intrusions et les actes de vandalisme tout au long de vos travaux.',
        primaryCta: {
            label: 'Nous contacter',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'En savoir plus',
            href: '/chantiers',
        },
        stats: [
            { label: 'Secteurs', value: 'BTP & infrastructures' },
            { label: 'Surveillance', value: "Rondes et contrôle d'accès" },
            { label: 'Disponibilité', value: '24h/24 • 7j/7' },
        ],
    },
    'zones-minieres': {
        layout: 'split-right',
        typography: 'accent-block',
        title: 'Sécurisation renforcée de vos',
        highlight: 'sites miniers',
        description:
            'Super Sécurité assure la protection de vos zones minières et sites sensibles grâce à des dispositifs de surveillance avancés, des équipes spécialisées et des protocoles de sécurité stricts adaptés aux environnements à haut risque.',
        primaryCta: {
            label: 'Nous contacter',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'En savoir plus',
            href: '/zones-minieres',
        },
        stats: [
            { label: 'Secteurs', value: 'Mines & sites sensibles' },
            { label: 'Protocoles', value: 'Stricts et adaptés au terrain' },
            {
                label: 'Expertise',
                value: 'Sécurité en environnements à haut risque',
            },
        ],
    },
    residence: {
        layout: 'split-right',
        typography: 'accent-block',
        title: 'Offrez à votre famille une',
        highlight: "tranquillité d'esprit permanente",
        description:
            'Super Sécurité assure la protection de vos résidences, villas et immeubles grâce à une présence humaine fiable, des contrôles rigoureux et une surveillance continue, de jour comme de nuit.',
        primaryCta: {
            label: 'Demander une protection',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'Découvrir',
            href: '/residence',
        },
        stats: [
            { label: 'Résidences', value: 'Villas & immeubles' },
            { label: 'Surveillance', value: 'Jour et nuit' },
            { label: 'Disponibilité', value: '24h/24 • 7j/7' },
        ],
    },
};

const serviceSlides: MarketingHeroVariant[] = superSecuriteServices.map(
    (service) => {
        const config = serviceSlideConfigs[service.id];
        const imagePath =
            serviceImages[service.id as keyof typeof serviceImages];

        return {
            id: service.id,
            layout: config.layout,
            typography: config.typography,
            label: service.title,
            title: config.title,
            highlight: config.highlight,
            description: config.description ?? service.description,
            primaryCta: config.primaryCta ?? {
                label: 'Nous contacter',
                href: contact.url(),
            },
            secondaryCta:
                config.secondaryCta === null
                    ? undefined
                    : (config.secondaryCta ?? {
                          label: 'En savoir plus',
                          href: service.path,
                      }),
            image: `/${imagePath}`,
            imageAlt: `${service.title} — Super Sécurité`,
            backgroundImage: imagePath,
            stats: config.stats,
        };
    },
);

export const marketingHeroSlides: readonly MarketingHeroVariant[] = [
    {
        id: 'excellence',
        layout: 'split-right',
        typography: 'accent-block',
        label: 'Super SÉCURITÉ',
        title: 'Votre partenaire de confiance pour une',
        highlight: 'sécurité sans compromis',
        description:
            'Super Sécurité accompagne les entreprises, résidences, chantiers et sites stratégiques à travers toute la Guinée avec des solutions de sécurité fiables, réactives et adaptées à chaque environnement.',
        primaryCta: {
            label: 'Nous contacter',
            href: contact.url(),
        },
        secondaryCta: {
            label: 'Nos offres',
            href: '#services',
        },
        image: superSecuriteStock.home.welcome,
        imageAlt:
            'Super Sécurité — partenaire de confiance en sécurité privée en Guinée',
        backgroundImage: superSecuriteStock.hero.background,
        stats: [
            { label: 'Disponibilité', value: '24h/24 • 7j/7' },
            { label: 'Couverture', value: 'Conakry & Toute la Guinée' },
            { label: 'Expertise', value: 'Gardiennage & Sécurité Privée' },
        ],
    },
    ...serviceSlides,
] as const;

export const marketingHeroSlideLabels = marketingHeroSlides.map((slide) => {
    if (slide.id === 'excellence') {
        return 'Confiance';
    }

    const service = superSecuriteServices.find((item) => item.id === slide.id);

    return service?.title.replace('Sécurité ', '') ?? slide.label;
}) as readonly string[];
