import {
    Award,
    Clock,
    Factory,
    PartyPopper,
    Shield,
    Users,
    Zap,
    type LucideIcon,
} from 'lucide-react';

export type SuperSecuriteService = {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    anchor: string;
};

export const superSecuriteServices: readonly SuperSecuriteService[] = [
    {
        id: 'industriel',
        icon: Factory,
        title: 'Sécurité des sites industriels et miniers',
        description:
            'Surveillance rigoureuse de vos installations sensibles avec des équipes professionnelles, formées aux protocoles de sécurité les plus stricts.',
        anchor: '#services',
    },
    {
        id: 'gardiennage',
        icon: Shield,
        title: 'Gardiennage et surveillance',
        description:
            "Des agents de sécurité hautement qualifiés, disponibles jour et nuit pour protéger vos locaux, bureaux et résidences. Votre tranquillité d'esprit, notre mission.",
        anchor: '#services',
    },
    {
        id: 'evenementiel',
        icon: PartyPopper,
        title: 'Sécurité événementielle',
        description:
            'Gestion complète de la sécurité pour événements publics et privés, assurée par des experts habitués aux situations de haute exigence.',
        anchor: '#services',
    },
] as const;

export type SuperSecuriteAdvantage = {
    icon: LucideIcon;
    title: string;
    description: string;
};

export const superSecuriteAdvantages: readonly SuperSecuriteAdvantage[] = [
    {
        icon: Award,
        title: 'Expérience et professionnalisme',
        description:
            'Une équipe d’experts en sécurité privée, formée aux standards les plus exigeants du secteur.',
    },
    {
        icon: Zap,
        title: "Rapidité d'intervention",
        description:
            'Réactivité et déploiement rapide pour sécuriser vos sites, événements et installations.',
    },
    {
        icon: Clock,
        title: 'Disponibilité 24/7',
        description:
            'Intervention 24h/24 et 7j/7 pour garantir votre protection et celle de vos biens.',
    },
    {
        icon: Users,
        title: 'Équipe certifiée et formée',
        description:
            'Agents certifiés, habitués aux protocoles industriels, résidentiels et événementiels.',
    },
] as const;

export type SuperSecuriteTestimonial = {
    quote: string;
    author: string;
};

export const superSecuriteTestimonials: readonly SuperSecuriteTestimonial[] = [
    {
        quote:
            'Avec Super Sécurité, nous avons trouvé un partenaire fiable et professionnel. Leur présence constante a été déterminante pour sécuriser nos installations.',
        author: 'Entreprise — Global Archer',
    },
    {
        quote:
            'Le professionnalisme des agents de Super Sécurité est exemplaire. Ils sont disponibles en tout temps (24H/7) et leur réactivité est irréprochable.',
        author: 'Client résidentiel',
    },
    {
        quote:
            "Super Sécurité a assuré la surveillance de notre site industriel avec un professionnalisme remarquable. Leur présence a considérablement réduit les risques de vols et d'incidents.",
        author: 'Entreprise — DGI',
    },
] as const;

export const superSecuriteFooterServices = [
    'Gardiennage résidence — bureaux — chantier — zone minière',
    'Vidéos et télé surveillance',
    'Sécurité événementiel : sportif et culturel',
] as const;

export const superSecuriteWelcome = {
    title: 'Bienvenue chez Super SÉCURITÉ',
    paragraphs: [
        'La sécurité est un besoin fondamental, et chez Super Sécurité, nous nous engageons à protéger ce qui compte le plus pour vous. Que vous soyez une entreprise cherchant à sécuriser vos installations ou un particulier en quête de tranquillité d’esprit, nous avons les solutions adaptées à vos besoins.',
        'Super Sécurité, c’est une équipe d’experts en sécurité privée, prêts à intervenir 24h/24 et 7j/7 pour garantir votre protection et celle de vos biens.',
    ],
} as const;
