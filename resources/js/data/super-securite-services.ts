import { superSecuriteServices } from '@/data/super-securite-content';
import {
    superSecuriteHoursLong,
    superSecuriteHoursShort,
} from '@/data/super-securite-hours';
import { superSecuriteZoneLabel } from '@/data/super-securite-zone';
import type {
    MarketingPageHeroStat,
    MarketingPageHeroUnderline,
} from '@/data/marketing-page-heroes';
import { superSecuriteStock } from '@/data/super-securite-stock';

export type SuperSecuriteServiceId =
    | 'entreprise'
    | 'residence'
    | 'chantiers'
    | 'zones-minieres';

export type SuperSecuriteServiceSection = {
    title: string;
    description: string;
};

export type SuperSecuriteServiceGalleryImage = {
    src: string;
    alt: string;
    caption?: string;
};

export type SuperSecuriteServiceHero = {
    id: string;
    label: string;
    titleLead: string;
    titleHighlight: string;
    titleTrail?: string;
    description: string;
    image: string;
    imageAlt: string;
    underline: MarketingPageHeroUnderline;
    stats: readonly MarketingPageHeroStat[];
};

export type SuperSecuriteServiceDefinition = {
    id: SuperSecuriteServiceId;
    path: string;
    icon: string;
    cover: string;
    title: string;
    navLabel: string;
    navTagline: string;
    cardDescription: string;
    focusKeyword: string;
    metaTitle: string;
    metaDescription: string;
    hero: SuperSecuriteServiceHero;
    intro: readonly string[];
    benefits: readonly string[];
    sections: readonly SuperSecuriteServiceSection[];
    includes: readonly string[];
    gallery: readonly SuperSecuriteServiceGalleryImage[];
    galleryTitle: string;
    galleryDescription: string;
};

const serviceImages = superSecuriteStock.home.services;

const serviceMeta: Record<
    SuperSecuriteServiceId,
    Omit<
        SuperSecuriteServiceDefinition,
        'id' | 'path' | 'icon' | 'title' | 'navLabel' | 'navTagline' | 'cardDescription'
    >
> = {
    entreprise: {
        focusKeyword: 'sécurité entreprise Conakry',
        metaTitle: 'Sécurité entreprise Conakry | Super Sécurité',
        metaDescription: `Sécurité entreprise à ${superSecuriteZoneLabel} : gardiennage et surveillance pour bureaux, commerces et entrepôts, ${superSecuriteHoursLong}.`,
        cover: `/${serviceImages.entreprise}`,
        hero: {
            id: 'entreprise',
            label: 'Sécurité entreprise',
            titleLead: 'Protégez vos locaux',
            titleHighlight: 'professionnels',
            description: `Protection de vos locaux professionnels avec des agents qualifiés, disponibles ${superSecuriteHoursLong} à ${superSecuriteZoneLabel}.`,
            image: `/${serviceImages.entreprise}`,
            imageAlt: 'Sécurité entreprise — Super Sécurité Conakry',
            underline: 'grow',
            stats: [
                { label: 'Surveillance', value: 'Continue' },
                { label: 'Zone', value: superSecuriteZoneLabel },
                { label: 'Équipes', value: 'Formées & certifiées' },
            ],
        },
        intro: [
            `Super Sécurité accompagne les entreprises de ${superSecuriteZoneLabel} dans la protection de leurs sites : bureaux, commerces, entrepôts et espaces de réception.`,
            'Nous déployons des agents formés, des rondes structurées et des consignes adaptées à votre activité pour garantir une présence dissuasive et une réaction rapide en cas d’incident.',
        ],
        benefits: [
            'Bureaux & commerces',
            'Contrôle d’accès',
            `Disponible ${superSecuriteHoursShort}`,
        ],
        sections: [
            {
                title: 'Présence sur site',
                description:
                    'Des équipes mobilisables en permanence pour sécuriser vos accès, halls d’accueil, parkings et zones sensibles (serveurs, caisses, réserves).',
            },
            {
                title: 'Protocoles adaptés',
                description:
                    'Consignes claires, rondes horodatées, registres de passage et reporting régulier selon vos exigences opérationnelles et contractuelles.',
            },
            {
                title: 'Réactivité',
                description:
                    'Intervention rapide en cas d’intrusion, conflit ou anomalie, avec remontée immédiate vers votre responsable sécurité ou direction.',
            },
            {
                title: 'Image professionnelle',
                description:
                    'Des agents en tenue, courtois et formés à l’accueil, pour renforcer la confiance de vos clients, visiteurs et collaborateurs.',
            },
        ],
        includes: [
            'Gardiennage statique et rondes de surveillance',
            'Contrôle des accès piétons et véhicules',
            'Tenue de registres et rapports d’activité',
            'Coordination avec vos équipes internes',
            'Renforts ponctuels sur demande',
        ],
        galleryTitle: 'Nos interventions entreprise',
        galleryDescription:
            'Quelques scènes de terrain — visuels provisoires, remplaçables par vos photos de missions.',
        gallery: [
            {
                src: `/${serviceImages.entreprise}`,
                alt: 'Agent de sécurité en entreprise',
                caption: 'Surveillance de locaux professionnels',
            },
            {
                src: superSecuriteStock.home.welcome,
                alt: 'Équipe Super Sécurité sur site',
                caption: 'Équipe mobilisée sur mission',
            },
            {
                src: superSecuriteStock.pages.actualites,
                alt: 'Agent avec tablette de reporting',
                caption: 'Reporting et suivi des rondes',
            },
            {
                src: superSecuriteStock.pages.contact2,
                alt: 'Agent de sécurité en poste',
                caption: 'Présence dissuasive aux accès',
            },
        ],
    },
    residence: {
        focusKeyword: 'gardiennage résidence Conakry',
        metaTitle: 'Sécurité résidence Conakry | Super Sécurité',
        metaDescription: `Gardiennage et surveillance de résidences à ${superSecuriteZoneLabel} : villas, immeubles et lotissements protégés ${superSecuriteHoursLong}.`,
        cover: `/${serviceImages.residence}`,
        hero: {
            id: 'residence',
            label: 'Sécurité résidence',
            titleLead: 'Sécurisez votre',
            titleHighlight: 'résidence',
            description: `Tranquillité d’esprit pour vos villas et immeubles grâce à une surveillance rigoureuse et dissuasive à ${superSecuriteZoneLabel}.`,
            image: `/${serviceImages.residence}`,
            imageAlt: 'Sécurité résidence — Super Sécurité Conakry',
            underline: 'slide',
            stats: [
                { label: 'Protection', value: 'Villas & immeubles' },
                { label: 'Présence', value: 'Dissuasive' },
                { label: 'Disponibilité', value: superSecuriteHoursShort },
            ],
        },
        intro: [
            'La sécurité résidentielle exige discrétion, vigilance et confiance. Super Sécurité protège villas, immeubles et lotissements avec des agents sélectionnés et formés aux spécificités du gardiennage de proximité.',
            'Nous assurons une présence rassurante pour les résidents tout en filtrant les accès et en signalant toute situation anormale.',
        ],
        benefits: [
            'Villas & immeubles',
            'Surveillance continue',
            'Agents de confiance',
        ],
        sections: [
            {
                title: 'Protection du domicile',
                description:
                    'Présence aux portails, parkings et espaces communs pour dissuader les intrusions et accompagner les résidents si besoin.',
            },
            {
                title: 'Surveillance nocturne',
                description:
                    'Rondes régulières et vigilance accrue aux heures les plus sensibles, avec consignes adaptées à la configuration de votre résidence.',
            },
            {
                title: 'Gestion des visiteurs',
                description:
                    'Contrôle des entrées, annonce des visiteurs et respect des procédures définies par le syndic ou le propriétaire.',
            },
            {
                title: 'Accompagnement sur mesure',
                description:
                    'Des effectifs et des horaires ajustés à la taille de votre résidence, du petit lotissement à l’immeuble multi-logements.',
            },
        ],
        includes: [
            'Gardiennage de portail et accueil résidents',
            'Rondes dans les parties communes',
            'Surveillance nocturne renforcée',
            'Rapports d’incidents et de présence',
            'Agents formés à la relation résident',
        ],
        galleryTitle: 'Sécurité résidentielle',
        galleryDescription:
            'Images illustratives de nos prestations résidence — à personnaliser avec vos propres visuels.',
        gallery: [
            {
                src: `/${serviceImages.residence}`,
                alt: 'Surveillance de résidence',
                caption: 'Protection de villa et immeuble',
            },
            {
                src: superSecuriteStock.home.whyUsBannerTransparent,
                alt: 'Agent en résidence',
                caption: 'Présence rassurante pour les résidents',
            },
            {
                src: superSecuriteStock.about.heroSide,
                alt: 'Contrôle d’accès résidentiel',
                caption: 'Filtrage des visiteurs',
            },
            {
                src: superSecuriteStock.home.welcome2,
                alt: 'Ronde de nuit',
                caption: 'Surveillance nocturne',
            },
        ],
    },
    chantiers: {
        focusKeyword: 'sécurité chantier Guinée',
        metaTitle: `Sécurité chantiers BTP | Super Sécurité — ${superSecuriteZoneLabel}`,
        metaDescription: `Sécurité de chantiers BTP à ${superSecuriteZoneLabel} : protection du matériel, contrôle des accès et patrouilles sur site.`,
        cover: `/${serviceImages.chantiers}`,
        hero: {
            id: 'chantiers',
            label: 'Sécurité chantiers',
            titleLead: 'Vos chantiers',
            titleHighlight: 'sous contrôle',
            description: `Sécurisation de vos chantiers BTP avec contrôle des accès, patrouilles et protection du matériel à ${superSecuriteZoneLabel}.`,
            image: `/${serviceImages.chantiers}`,
            imageAlt: `Sécurité chantiers — Super Sécurité ${superSecuriteZoneLabel}`,
            underline: 'draw',
            stats: [
                { label: 'Secteurs', value: 'BTP & travaux' },
                { label: 'Patrouilles', value: 'Régulières' },
                { label: 'Réactivité', value: superSecuriteHoursShort },
            ],
        },
        intro: [
            'Les chantiers sont des cibles privilégiées pour le vol de matériaux et d’équipements. Super Sécurité met en place une organisation de terrain adaptée aux flux ouvriers, livraisons et horaires de travail.',
            'Nos équipes sécurisent périmètres, zones de stockage et accès pour limiter les pertes et garantir la continuité de vos travaux.',
        ],
        benefits: [
            'Chantiers BTP',
            'Protection matériel',
            'Patrouilles régulières',
        ],
        sections: [
            {
                title: 'Sites en construction',
                description:
                    'Sécurisation adaptée aux environnements de chantier, avec gestion des flux ouvriers, sous-traitants et livraisons.',
            },
            {
                title: 'Prévention des vols',
                description:
                    'Présence dissuasive pour limiter le vol de matériaux, outillage et équipements, notamment en dehors des heures ouvrées.',
            },
            {
                title: 'Contrôle des accès',
                description:
                    'Filtrage à l’entrée, vérification des badges et traçabilité des personnes autorisées sur le site.',
            },
            {
                title: 'Coordination chantier',
                description:
                    'Liaison avec le chef de chantier et remontée rapide des anomalies pour ne pas ralentir l’avancement des travaux.',
            },
        ],
        includes: [
            'Gardiennage de point d’accès chantier',
            'Patrouilles périmétriques jour et nuit',
            'Surveillance des zones de stockage',
            'Registre des entrées / sorties',
            'Rapports quotidiens au maître d’ouvrage',
        ],
        galleryTitle: 'Chantiers sécurisés',
        galleryDescription:
            'Galerie provisoire — remplacez ces visuels par vos photos de chantiers réels.',
        gallery: [
            {
                src: `/${serviceImages.chantiers}`,
                alt: 'Superviseur sur chantier BTP',
                caption: 'Encadrement et surveillance terrain',
            },
            {
                src: `/${serviceImages.entreprise}`,
                alt: 'Agent sur site industriel',
                caption: 'Protection des zones sensibles',
            },
            {
                src: superSecuriteStock.pages.about,
                alt: 'Équipe sur site de travaux',
                caption: 'Présence sur grands chantiers',
            },
            {
                src: '/images/super-securite/pages/emerging.jpg',
                alt: 'Sécurité de périmètre chantier',
                caption: 'Contrôle du périmètre',
            },
        ],
    },
    'zones-minieres': {
        focusKeyword: 'sécurité minière Guinée',
        metaTitle: `Sécurité zones minières | Super Sécurité — ${superSecuriteZoneLabel}`,
        metaDescription: `Sécurité des zones minières à ${superSecuriteZoneLabel} : équipes formées aux protocoles les plus stricts pour sites sensibles.`,
        cover: `/${serviceImages['zones-minieres']}`,
        hero: {
            id: 'zones-minieres',
            label: 'Zones minières',
            titleLead: 'Sites miniers',
            titleHighlight: 'sécurisés',
            description: `Surveillance rigoureuse des sites miniers avec des équipes formées aux protocoles de sécurité exigeants à ${superSecuriteZoneLabel}.`,
            image: `/${serviceImages['zones-minieres']}`,
            imageAlt: `Sécurité zones minières — Super Sécurité ${superSecuriteZoneLabel}`,
            underline: 'scan',
            stats: [
                { label: 'Secteurs', value: 'Mines & sites sensibles' },
                { label: 'Protocoles', value: 'Sur mesure' },
                { label: 'Expertise', value: 'Terrain' },
            ],
        },
        intro: [
            'Les sites miniers et installations sensibles demandent rigueur, discipline et respect strict des procédures HSE. Super Sécurité déploie des équipes habituées aux environnements à risque et aux consignes opérationnelles exigeantes.',
            'Nous contribuons à la protection des personnes, des équipements et des accès sur des sites souvent isolés.',
        ],
        benefits: [
            'Sites miniers',
            'Protocoles stricts',
            'Équipes spécialisées',
        ],
        sections: [
            {
                title: 'Environnements à risque',
                description:
                    'Protection adaptée aux sites miniers, carrières et installations sensibles en zone isolée ou difficile d’accès.',
            },
            {
                title: 'Conformité opérationnelle',
                description:
                    'Respect des consignes HSE, EPI obligatoires et procédures imposées par vos responsables de site.',
            },
            {
                title: 'Réduction des incidents',
                description:
                    'Présence dissuasive et réactive pour limiter vols, intrusions et comportements à risque sur le périmètre.',
            },
            {
                title: 'Continuité d’activité',
                description:
                    'Organisation des effectifs pour couvrir les postes critiques sans interruption, y compris en rotation.',
            },
        ],
        includes: [
            'Gardiennage de postes fixes et checkpoints',
            'Patrouilles véhiculaires et périmétriques',
            'Contrôle strict des accès et badges',
            'Remontée d’incidents en temps réel',
            'Équipes briefées aux consignes du site',
        ],
        galleryTitle: 'Zones minières & sites sensibles',
        galleryDescription:
            'Visuels de démonstration — à remplacer par vos images de sites miniers.',
        gallery: [
            {
                src: `/${serviceImages['zones-minieres']}`,
                alt: 'Agent en zone minière',
                caption: 'Surveillance de site minier',
            },
            {
                src: `/${serviceImages.chantiers}`,
                alt: 'Supervision terrain',
                caption: 'Encadrement sur site sensible',
            },
            {
                src: '/images/super-securite/hero/IMG_9665.jpg',
                alt: 'Équipe de sécurité en intervention',
                caption: 'Équipe spécialisée terrain',
            },
            {
                src: superSecuriteStock.about.story,
                alt: 'Protocoles de sécurité sur site',
                caption: 'Respect des procédures HSE',
            },
        ],
    },
};

export const superSecuriteServiceDefinitions: readonly SuperSecuriteServiceDefinition[] =
    superSecuriteServices.map((service) => {
        const meta = serviceMeta[service.id as SuperSecuriteServiceId];

        return {
            id: service.id as SuperSecuriteServiceId,
            path: service.path,
            icon: '',
            title: service.title,
            navLabel: service.title.replace('Sécurité ', ''),
            navTagline: `Sécurité privée à ${superSecuriteZoneLabel}`,
            cardDescription: service.description,
            ...meta,
        };
    });

export const superSecuriteServiceById: Record<
    SuperSecuriteServiceId,
    SuperSecuriteServiceDefinition
> = Object.fromEntries(
    superSecuriteServiceDefinitions.map((service) => [service.id, service]),
) as Record<SuperSecuriteServiceId, SuperSecuriteServiceDefinition>;

export const superSecuriteServiceIds: readonly SuperSecuriteServiceId[] =
    superSecuriteServiceDefinitions.map((service) => service.id);
