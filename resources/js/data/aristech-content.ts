import {
    aristechServiceDefinitions,
    type AristechServiceId,
} from '@/data/aristech-services';

export type AristechServiceCard = {
    icon: string;
    cover: string;
    title: string;
    href: string;
    description: string;
};

export const aristechServices: readonly AristechServiceCard[] =
    aristechServiceDefinitions.map((service) => ({
        icon: service.icon,
        cover: service.cover,
        title: service.title,
        href: service.path,
        description: service.cardDescription,
    }));

export type { AristechServiceId };

export const aristechMissionBlocks = [
    {
        title: 'Qui sommes-nous ?',
        content:
            "ArisTech est une agence web basée à Conakry, Guinée. Aristide Gnimassou, fondateur et développeur principal, conçoit des sites internet sur mesure, des applications web et des boutiques en ligne. En solo ou avec des experts partenaires, nous livrons des solutions fiables pour la Guinée, l'Afrique de l'Ouest et l'Afrique francophone.",
    },
    {
        title: 'Notre Mission',
        content:
            'Rendre le développement web accessible aux entreprises guinéennes : site internet professionnel, e-commerce rentable, visibilité Google (SEO) et accompagnement après la mise en ligne. Chaque projet est cadré avec transparence, des délais réalistes et un code maintenable.',
    },
] as const;

export type TechStackCategory =
    | 'frontend'
    | 'backend'
    | 'cms'
    | 'database'
    | 'mobile';

export type TechStackItem = {
    path: string;
    label: string;
};

export const aristechTechStack: Record<TechStackCategory, TechStackItem[]> = {
    frontend: [
        { path: '/images/aristech/stack/html5.svg', label: 'HTML' },
        { path: '/images/aristech/tech/react.svg', label: 'React' },
        { path: '/images/aristech/stack/nextjs.svg', label: 'Next Js' },
        { path: '/images/aristech/tech/vue.svg', label: 'VueJs' },
        { path: '/images/aristech/stack/nuxt.svg', label: 'NuxtJs' },
        { path: '/images/aristech/stack/css3.svg', label: 'CSS' },
        { path: '/images/aristech/tech/tailwind.svg', label: 'Tailwind' },
        { path: '/images/aristech/stack/bootstrap.svg', label: 'Bootstrap' },
    ],
    backend: [
        { path: '/images/aristech/tech/php.svg', label: 'PHP' },
        { path: '/images/aristech/tech/laravel.svg', label: 'Laravel' },
        { path: '/images/aristech/stack/python.svg', label: 'Python' },
        { path: '/images/aristech/stack/django.svg', label: 'Django' },
        { path: '/images/aristech/tech/flask.svg', label: 'Flask' },
    ],
    cms: [
        { path: '/images/aristech/stack/wordpress.svg', label: 'WordPress' },
        { path: '/images/aristech/stack/wix.svg', label: 'Wix' },
        { path: '/images/aristech/stack/shopify.svg', label: 'Shopify' },
    ],
    database: [
        { path: '/images/aristech/stack/MySql.svg', label: 'MySql' },
        { path: '/images/aristech/stack/firebase.svg', label: 'Firebase' },
        { path: '/images/aristech/stack/MongoDB.svg', label: 'MongoDB' },
        { path: '/images/aristech/stack/PostgreSQL.svg', label: 'PostgreSQL' },
        { path: '/images/aristech/stack/MariaDB.svg', label: 'MariaDB' },
    ],
    mobile: [
        {
            path: '/images/aristech/tech/react-native.svg',
            label: 'React Native',
        },
        { path: '/images/aristech/tech/flutter.svg', label: 'Flutter' },
    ],
};

export const techStackTabs: { id: TechStackCategory; label: string }[] = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'cms', label: 'CMS' },
    { id: 'database', label: 'Base de données' },
    { id: 'mobile', label: 'Mobile' },
];

export type AristechProject = {
    title: string;
    description: string;
    image: string;
    category: string;
    href: string;
    featured?: boolean;
};

export const aristechProjects: AristechProject[] = [
    {
        title: 'Sily Link',
        description:
            'Plateforme de paiement sécurisée avec intégration multi-devises et vérification avancée.',
        image: '/images/aristech/projets/silylink.png',
        category: 'FinTech',
        href: 'https://silylink.com/',
        featured: true,
    },
    {
        title: 'Short Link',
        description:
            "Raccourcissement d'URL, analytics, QR codes et campagnes marketing.",
        image: '/images/aristech/projets/shortlink.png',
        category: 'Utilitaires',
        href: 'https://shortgn.click/',
    },
    {
        title: '7 Makity',
        description:
            "E-commerce complet avec paiement sécurisé et gestion d'inventaire en temps réel.",
        image: '/images/aristech/projets/7makiti.png',
        category: 'E-commerce',
        href: '#projets',
    },
    {
        title: 'Drive Me',
        description:
            'Covoiturage avec géolocalisation, notation et paiement intégré.',
        image: '/images/aristech/projets/driveme.png',
        category: 'Web & mobile',
        href: '#projets',
    },
    {
        title: 'Eva',
        description:
            'Suivi de grossesse, conseils personnalisés et rappels médicaux.',
        image: '/images/aristech/projets/eva.png',
        category: 'Santé & éducation',
        href: '#projets',
    },
];
