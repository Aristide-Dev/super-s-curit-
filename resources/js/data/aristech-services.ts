import { aristechStock } from '@/data/aristech-stock';

export type AristechServiceId =
    | 'applicationWeb'
    | 'creationSite'
    | 'woocommerce'
    | 'integrateurSolutions'
    | 'seo';

export type AristechServiceSection = {
    title: string;
    description: string;
};

export type AristechServiceDefinition = {
    id: AristechServiceId;
    path: string;
    icon: string;
    cover: string;
    /** Titre affiché sur les cartes services et fil d’Ariane SEO */
    title: string;
    navLabel: string;
    navTagline: string;
    cardDescription: string;
    pageLabel: string;
    pageTitle: string;
    pageHighlight: string;
    pageDescription: string;
    imageAlt: string;
    focusKeyword: string;
    metaTitle: string;
    metaDescription: string;
    benefits: readonly string[];
    sections: readonly AristechServiceSection[];
};

export const aristechServiceDefinitions: readonly AristechServiceDefinition[] =
    [
        {
            id: 'applicationWeb',
            path: '/application-web',
            icon: '/images/aristech/services/responsive_icon.svg',
            cover: aristechStock.services.applications,
            title: 'Application web & mobile sur mesure',
            navLabel: 'Application web & mobile',
            navTagline: 'Développement sur mesure à Conakry',
            cardDescription:
                'Applications web et mobiles sur mesure : tableaux de bord, espaces clients, API et produits SaaS pour entreprises en Guinée.',
            pageLabel: 'Application web & mobile sur mesure',
            pageTitle: 'Application web & mobile',
            pageHighlight: 'sur mesure',
            pageDescription:
                'ArisTech développe des applications web et mobiles sur mesure à Conakry : tableaux de bord, portails clients, API et outils métier pour PME et startups en Guinée.',
            imageAlt:
                'Développement application web et mobile sur mesure à Conakry',
            focusKeyword: 'application web Conakry',
            metaTitle:
                'Application web & mobile Conakry | Développement sur mesure Guinée',
            metaDescription:
                "Développement d'applications web et mobiles sur mesure à Conakry : tableaux de bord, portails clients, API et outils métier pour entreprises en Guinée.",
            benefits: [
                'Application web Conakry',
                'Développement web Conakry',
                'Développeur web Guinée',
            ],
            sections: [
                {
                    title: 'Un outil adapté à vos processus',
                    description:
                        'Nous cadrons vos workflows avant de développer pour livrer une application utile, maintenable et simple à faire évoluer.',
                },
                {
                    title: 'Interfaces rapides et sécurisées',
                    description:
                        'Écrans, rôles, formulaires et tableaux de bord pensés pour vos équipes et vos clients.',
                },
                {
                    title: 'API et intégrations métier',
                    description:
                        'Connexion à vos paiements, CRM, notifications ou systèmes internes existants.',
                },
            ],
        },
        {
            id: 'creationSite',
            path: '/creation-site',
            icon: '/images/aristech/services/responsive_icon.svg',
            cover: aristechStock.services.websites,
            title: 'Création de site internet',
            navLabel: 'Création de site internet',
            navTagline: 'Sites vitrines & institutionnels',
            cardDescription:
                'Sites vitrines et institutionnels sur mesure : design soigné, performances et référencement naturel (Laravel, React).',
            pageLabel: 'Création de site internet',
            pageTitle: 'Création de site internet',
            pageHighlight: 'sur mesure',
            pageDescription:
                'ArisTech conçoit des sites internet professionnels en Guinée : vitrine, institutionnel ou portail léger, avec une stack moderne et une base SEO solide.',
            imageAlt:
                'Création de site internet sur mesure en Guinée avec ArisTech',
            focusKeyword: 'création site internet Guinée',
            metaTitle:
                'Création de site internet Guinée | Site sur mesure à Conakry',
            metaDescription:
                'Création de site internet en Guinée : site vitrine, site institutionnel et plateforme sur mesure à Conakry avec ArisTech (Laravel, React).',
            benefits: [
                'Création site internet Guinée',
                'Site sur mesure Guinée',
                'Agence web Conakry',
            ],
            sections: [
                {
                    title: 'Un site aligné sur votre image',
                    description:
                        'Design soigné, contenus structurés et parcours utilisateur clair pour convertir vos visiteurs en contacts ou clients.',
                },
                {
                    title: 'Performance et SEO dès le lancement',
                    description:
                        'Pages rapides, balises optimisées et structure pensée pour Conakry, la Guinée et vos mots-clés prioritaires.',
                },
                {
                    title: 'Évolutif et maintenable',
                    description:
                        'Code propre, interface d’administration adaptée et accompagnement après mise en ligne pour faire grandir votre site.',
                },
            ],
        },
        {
            id: 'woocommerce',
            path: '/woocommerce',
            icon: '/images/aristech/services/seo_icon.svg',
            cover: aristechStock.services.ecommerce,
            title: 'Boutique en ligne',
            navLabel: 'Boutique en ligne',
            navTagline: 'E-commerce à Conakry',
            cardDescription:
                "Boutique en ligne en Guinée : catalogue, paiement mobile money ou carte, stocks et tunnel d'achat optimisé.",
            pageLabel: 'Boutique en ligne',
            pageTitle: 'Boutique en ligne',
            pageHighlight: 'en Guinée',
            pageDescription:
                'ArisTech lance votre boutique en ligne en Guinée : catalogue, paiement, stocks et parcours d’achat optimisé pour le marché local.',
            imageAlt: 'Création de boutique en ligne en Guinée',
            focusKeyword: 'boutique en ligne Guinée',
            metaTitle: 'Boutique en ligne Guinée | E-commerce à Conakry',
            metaDescription:
                "Création de boutique en ligne en Guinée : catalogue, paiement, stocks et tunnel d'achat optimisé pour vendre depuis Conakry.",
            benefits: [
                'Création boutique en ligne Guinée',
                'Site e-commerce',
                'Boutique en ligne',
            ],
            sections: [
                {
                    title: 'Une boutique prête à vendre',
                    description:
                        'Catalogue, variations, stock, coupons et tunnel de commande structurés pour une gestion quotidienne simple.',
                },
                {
                    title: 'Paiements et logistique adaptés',
                    description:
                        'Intégration mobile money, carte bancaire, livraison ou retrait selon votre modèle économique.',
                },
                {
                    title: 'Pages produits optimisées',
                    description:
                        'Fiches produits pensées pour Google, les conversions et une navigation fluide sur mobile.',
                },
            ],
        },
        {
            id: 'integrateurSolutions',
            path: '/integrateur-solutions',
            icon: '/images/aristech/services/api',
            cover: aristechStock.services.api,
            title: 'Intégrateur de solutions',
            navLabel: 'Intégrateur de solutions',
            navTagline: 'API & outils métier',
            cardDescription:
                'Connexion de vos outils métier : API, CRM, paiements, automatisations et évolution de plateformes existantes.',
            pageLabel: 'Intégrateur de solutions',
            pageTitle: 'Intégrateur de solutions',
            pageHighlight: 'à Conakry',
            pageDescription:
                'ArisTech connecte vos outils et plateformes à Conakry : API, CRM, paiements, automatisations et évolution de systèmes existants.',
            imageAlt: 'Intégrateur de solutions et API à Conakry',
            focusKeyword: 'intégrateur de solutions Guinée',
            metaTitle:
                'Intégrateur de solutions Guinée | API & outils métier à Conakry',
            metaDescription:
                'Intégrateur de solutions à Conakry : connexion API, CRM, paiements, automatisations et évolution de vos plateformes web en Guinée.',
            benefits: [
                'Intégrateur de solutions Guinée',
                'Intégration API Conakry',
                'Développement sur mesure',
            ],
            sections: [
                {
                    title: 'Cartographie de votre écosystème',
                    description:
                        'Nous identifions les outils à connecter, les flux de données et les points de friction avant toute intégration.',
                },
                {
                    title: 'API, webhooks et synchronisation',
                    description:
                        'Connexion fiable entre votre site, vos applications et vos services tiers (paiement, CRM, ERP, etc.).',
                },
                {
                    title: 'Évolution et maintenance',
                    description:
                        'Corrections, montées de version et nouvelles intégrations pour accompagner la croissance de votre activité.',
                },
            ],
        },
        {
            id: 'seo',
            path: '/seo',
            icon: '/images/aristech/services/seo_icon.svg',
            cover: aristechStock.services.seo,
            title: 'Référencement SEO',
            navLabel: 'Référencement SEO',
            navTagline: 'Visibilité Google en Guinée',
            cardDescription:
                'Audit SEO, référencement naturel et optimisation Google : visibilité locale, contenus optimisés et suivi Analytics.',
            pageLabel: 'Référencement SEO',
            pageTitle: 'Référencement SEO',
            pageHighlight: 'en Guinée',
            pageDescription:
                'ArisTech améliore votre visibilité sur Google en Guinée : audit SEO, optimisation technique, contenus ciblés et suivi Analytics.',
            imageAlt: 'Référencement SEO et audit Google en Guinée',
            focusKeyword: 'Référencement SEO',
            metaTitle:
                'Référencement SEO | Audit & optimisation à Conakry',
            metaDescription:
                'Référencement SEO en Guinée : audit, optimisation technique, SEO local à Conakry et suivi Google Analytics.',
            benefits: [
                'Référencement SEO',
                'SEO local',
                'Audit SEO',
            ],
            sections: [
                {
                    title: 'Audit SEO complet',
                    description:
                        'Analyse de votre site, mots-clés locaux, concurrence et opportunités de positionnement sur Google en Guinée.',
                },
                {
                    title: 'Optimisation technique et contenu',
                    description:
                        'Balises, structure, performances, maillage interne et pages optimisées pour Conakry et vos services prioritaires.',
                },
                {
                    title: 'Suivi et amélioration continue',
                    description:
                        'Rapports Analytics, suivi des positions et recommandations pour consolider votre visibilité sur le long terme.',
                },
            ],
        },
    ] as const;

export const aristechServiceById: Record<
    AristechServiceId,
    AristechServiceDefinition
> = Object.fromEntries(
    aristechServiceDefinitions.map((service) => [service.id, service]),
) as Record<AristechServiceId, AristechServiceDefinition>;
