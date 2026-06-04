<?php

return [

    'site_name' => env('SEO_SITE_NAME', 'ArisTech'),

    'default_description' => env(
        'SEO_DEFAULT_DESCRIPTION',
        'ArisTech, agence web à Conakry : sites internet sur mesure, applications web, e-commerce et intégration de solutions en Guinée. Devis gratuit sous 24 h.',
    ),

    'locale' => env('SEO_LOCALE', 'fr_FR'),

    'language' => env('SEO_LANGUAGE', 'fr'),

    'twitter_site' => env('SEO_TWITTER_SITE'),

    'default_og_image' => '/images/aristech/aristech.jpeg',

    'og_image' => [
        'width' => 1200,
        'height' => 630,
        'type' => 'image/jpeg',
    ],

    'geo' => [
        'region' => 'GN',
        'placename' => 'Conakry',
    ],

    'organization' => [
        'name' => 'ArisTech',
        'legal_name' => 'ARISTECH',
        'alternate_name' => 'ArisTech Guinée',
        'slogan' => 'Votre agence web à Conakry, Guinée',
        'founding_date' => '2020',
        'founder' => 'Aristide Gnimassou',
        'founder_job_title' => 'Fondateur & développeur web',
        'description' => 'ArisTech est une agence web fondée à Conakry (Guinée) par Aristide Gnimassou. Développement de sites internet sur mesure, applications web, e-commerce et intégration de solutions (API, CRM, paiements) en Guinée et en Afrique de l\'Ouest.',
        'area_served' => 'Guinée et Afrique de l\'Ouest',
        'address_country' => 'GN',
        'address_locality' => 'Conakry',
        'address_street' => 'Kaporo, Ratoma',
        'geo_latitude' => '9.6412',
        'geo_longitude' => '-13.5784',
        'opening_hours' => 'Mo-Fr 09:00-18:00',
    ],

    'services' => [
        [
            'name' => 'Application web & mobile sur mesure',
            'description' => 'Développement d\'applications web et mobiles sur mesure : tableaux de bord, portails clients, API et outils métier pour PME et startups.',
            'path' => '/application-web',
            'meta_title' => 'Application web & mobile Conakry | Développement sur mesure Guinée',
            'meta_description' => 'Développement d\'applications web et mobiles sur mesure à Conakry : tableaux de bord, portails clients, API et outils métier pour entreprises en Guinée.',
            'og_image' => '/images/aristech/services/conakry-women-app.png',
            'og_image_alt' => 'Application web et mobile sur mesure à Conakry — ArisTech',
            'faqs' => [
                [
                    'question' => 'Combien coûte une application web sur mesure en Guinée ?',
                    'answer' => 'Le budget dépend des écrans, des rôles utilisateurs et des intégrations (paiement, CRM, API). Après cadrage, nous envoyons un devis forfaitaire ou une estimation en régie.',
                ],
                [
                    'question' => 'Proposez-vous des applications mobiles en plus du web ?',
                    'answer' => 'Oui : application web responsive, PWA ou application mobile (React Native, Flutter) selon votre audience et votre budget.',
                ],
            ],
        ],
        [
            'name' => 'Création de site internet',
            'description' => 'Sites vitrines et institutionnels sur mesure : design, performances, référencement naturel et stack moderne (Laravel, React).',
            'path' => '/creation-site',
            'meta_title' => 'Création de site internet Guinée | Site sur mesure à Conakry',
            'meta_description' => 'Création de site internet en Guinée : site vitrine, site institutionnel et plateforme sur mesure à Conakry avec ArisTech (Laravel, React).',
            'og_image' => '/images/aristech/services/Sites-Internet.jpg',
            'og_image_alt' => 'Création de site internet professionnel en Guinée — ArisTech',
            'faqs' => [
                [
                    'question' => 'Quel est le prix d\'un site internet en Guinée ?',
                    'answer' => 'Un site vitrine professionnel démarre selon le nombre de pages, le design et les fonctionnalités. Contactez-nous pour un devis détaillé adapté à votre projet.',
                ],
                [
                    'question' => 'Mon site sera-t-il visible sur Google ?',
                    'answer' => 'Oui : structure SEO, balises, performances et contenus locaux (Conakry, Guinée) sont intégrés dès la conception.',
                ],
            ],
        ],
        [
            'name' => 'Boutique en ligne',
            'description' => 'Boutique en ligne : catalogue, paiement mobile money ou carte, stocks, SEO produits et tunnel d\'achat optimisé.',
            'path' => '/woocommerce',
            'meta_title' => 'Boutique en ligne Guinée | E-commerce à Conakry',
            'meta_description' => 'Création de boutique en ligne en Guinée : catalogue, paiement, stocks et tunnel d\'achat optimisé pour vendre depuis Conakry.',
            'og_image' => '/images/aristech/services/E-commerce.jpg',
            'og_image_alt' => 'Boutique en ligne et e-commerce à Conakry — ArisTech',
            'faqs' => [
                [
                    'question' => 'Quels moyens de paiement pour une boutique en Guinée ?',
                    'answer' => 'Mobile money, carte bancaire et autres passerelles selon vos partenaires. Nous intégrons le tunnel adapté à vos clients.',
                ],
            ],
        ],
        [
            'name' => 'Intégrateur de solutions',
            'description' => 'Intégration API, CRM, paiements et automatisations pour connecter vos outils métier et faire évoluer vos plateformes.',
            'path' => '/integrateur-solutions',
            'meta_title' => 'Intégrateur de solutions Guinée | API & outils métier à Conakry',
            'meta_description' => 'Intégrateur de solutions à Conakry : connexion API, CRM, paiements, automatisations et évolution de vos plateformes web en Guinée.',
            'og_image' => '/images/aristech/services/API.jpg',
            'og_image_alt' => 'Intégration API et solutions métier à Conakry — ArisTech',
            'faqs' => [
                [
                    'question' => 'Pouvez-vous connecter mon site à un CRM ou ERP existant ?',
                    'answer' => 'Oui : nous cartographions vos flux, puis connectons API, webhooks ou exports selon la documentation de vos outils.',
                ],
            ],
        ],
        [
            'name' => 'Référencement SEO',
            'description' => 'Audit SEO, référencement naturel, optimisation Google et suivi Analytics pour améliorer votre visibilité.',
            'path' => '/seo',
            'meta_title' => 'Référencement SEO | Audit & optimisation à Conakry',
            'meta_description' => 'Référencement SEO en Guinée : audit, optimisation technique, SEO local à Conakry et suivi Google Analytics.',
            'og_image' => '/images/aristech/services/seo.jpg',
            'og_image_alt' => 'Référencement SEO et visibilité Google en Guinée — ArisTech',
            'faqs' => [
                [
                    'question' => 'Combien de temps pour voir des résultats SEO ?',
                    'answer' => 'Les premiers signaux techniques apparaissent en quelques semaines ; le positionnement dépend de la concurrence et de la régularité des optimisations.',
                ],
                [
                    'question' => 'Faites-vous du SEO local à Conakry ?',
                    'answer' => 'Oui : optimisation Google Business Profile, pages locales, contenus et données structurées pour la Guinée.',
                ],
            ],
        ],
    ],

    'faqs' => [
        [
            'question' => 'Combien coûte la création d\'un site internet ?',
            'answer' => 'Le prix dépend du type de projet : site internet sur mesure, boutique en ligne, application web ou intégration de solutions. Après analyse de votre besoin, nous envoyons un devis forfaitaire détaillé.',
        ],
        [
            'question' => 'Sous combien de temps répondez-vous ?',
            'answer' => 'Nous répondons à toutes les demandes sous 24 heures ouvrées. Pour les projets urgents, mentionnez-le dans votre message.',
        ],
        [
            'question' => 'Travaillez-vous avec des clients à l\'international ?',
            'answer' => 'Oui. Nous accompagnons des clients en Afrique, en Europe et en Amérique du Nord. Les projets se pilotent à distance avec des points réguliers.',
        ],
        [
            'question' => 'Quelle est la durée moyenne d\'un projet ?',
            'answer' => 'Un site vitrine se livre en 2 à 4 semaines. Une application web sur mesure prend généralement 6 à 12 semaines selon la complexité.',
        ],
        [
            'question' => 'Comment se passe la facturation ?',
            'answer' => 'Forfait pour les projets cadrés, ou régie (TJM) pour les missions évolutives. Un acompte de 30 % est demandé au lancement.',
        ],
        [
            'question' => 'Proposez-vous de la maintenance après livraison ?',
            'answer' => 'Oui : contrats de support et maintenance (correctifs, mises à jour, monitoring) selon vos besoins.',
        ],
    ],

    'knows_about' => [
        'ArisTech Guinée',
        'agence web Conakry',
        'création site internet Guinée',
        'développeur web Guinée',
        'boutique en ligne Guinée',
        'boutique WooCommerce Guinée',
        'application web Conakry',
        'développement web Conakry',
        'créer un site internet en Guinée',
        'prix création site web Guinée',
        'agence digitale Conakry',
        'Site e-commerce Guinée',
        'création boutique en ligne Guinée',
        'agence web Afrique de l\'Ouest',
        'développeur web Afrique francophone',
        'création site web Afrique',
        'agence digitale Afrique',
        'site sur mesure Guinée',
        'développement application web sur mesure',
        'intégrateur de solutions Guinée',
        'intégration API Conakry',
        'maintenance site web Guinée',
        'Référencement SEO',
        'référencement naturel Guinée',
        'référencement Google Guinée',
        'SEO local',
        'agence SEO Guinée',
        'Audit SEO',
        'consultant SEO Conakry',
        'optimisation SEO site web',
        'visibilité Google Guinée',
        'expert SEO Afrique',
        'positionnement Google Guinée',
        'développement web Guinée',
        'WooCommerce',
        'Shopify',
        'Laravel',
        'React',
        'référencement naturel',
        'création site internet',
        'développement web',
        'e-commerce',
        'Aristide Gnimassou',
    ],

    'legal_pages' => [
        [
            'path' => '/politique-de-confidentialite',
            'meta_title' => 'Politique de confidentialité | ArisTech Guinée',
            'meta_description' => 'Politique de confidentialité d\'ArisTech : collecte des données, cookies, durée de conservation et droits des utilisateurs en Guinée.',
            'robots' => 'index, follow',
        ],
        [
            'path' => '/mentions-legales',
            'meta_title' => 'Mentions légales | ArisTech Guinée',
            'meta_description' => 'Mentions légales ArisTech : éditeur du site, RCCM, contact et hébergement du site aristechguinee.com.',
            'robots' => 'index, follow',
        ],
    ],

    'case_studies' => [
        [
            'slug' => 'sily-link',
            'path' => '/realisations/sily-link',
            'title' => 'Sily Link',
            'category' => 'FinTech',
            'meta_title' => 'Étude de cas Sily Link | Plateforme FinTech — ArisTech',
            'meta_description' => 'Réalisation ArisTech : plateforme de paiement Sily Link, multi-devises et vérification avancée pour le marché guinéen.',
            'image' => '/images/aristech/projets/silylink.png',
            'summary' => 'Plateforme de paiement sécurisée avec intégration multi-devises et vérification avancée des transactions.',
            'challenge' => 'Proposer une infrastructure de paiement fiable, adaptée aux usages locaux et aux contraintes de connectivité.',
            'solution' => 'Architecture web sécurisée, API de paiement, tableau de bord et parcours utilisateur optimisés pour mobile.',
            'results' => [
                'Tunnel de paiement fluide sur smartphone',
                'Gestion multi-devises et reporting',
                'Base technique évolutive pour de nouveaux services',
            ],
            'external_url' => 'https://silylink.com/',
            'changefreq' => 'yearly',
            'priority' => 0.7,
        ],
        [
            'slug' => '7-makity',
            'path' => '/realisations/7-makity',
            'title' => '7 Makity',
            'category' => 'E-commerce',
            'meta_title' => 'Étude de cas 7 Makity | E-commerce — ArisTech Guinée',
            'meta_description' => 'Boutique en ligne 7 Makity : paiement sécurisé, gestion des stocks et tunnel d\'achat optimisé, développé par ArisTech.',
            'image' => '/images/aristech/projets/7makiti.png',
            'summary' => 'Boutique en ligne complète avec paiement sécurisé et gestion d\'inventaire en temps réel.',
            'challenge' => 'Lancer une boutique capable de gérer catalogue, stocks et commandes avec une expérience mobile-first.',
            'solution' => 'Site e-commerce sur mesure, tunnel d\'achat simplifié et back-office de gestion des produits.',
            'results' => [
                'Parcours d\'achat optimisé mobile',
                'Suivi des stocks en temps réel',
                'Intégration des moyens de paiement locaux',
            ],
            'external_url' => null,
            'changefreq' => 'yearly',
            'priority' => 0.7,
        ],
        [
            'slug' => 'drive-me',
            'path' => '/realisations/drive-me',
            'title' => 'Drive Me',
            'category' => 'Web & mobile',
            'meta_title' => 'Étude de cas Drive Me | Covoiturage web & mobile — ArisTech',
            'meta_description' => 'Application Drive Me : covoiturage, géolocalisation, notation et paiement intégré, conçue par ArisTech à Conakry.',
            'image' => '/images/aristech/projets/driveme.png',
            'summary' => 'Application de covoiturage avec géolocalisation, notation des conducteurs et paiement intégré.',
            'challenge' => 'Connecter passagers et conducteurs avec une interface simple et une géolocalisation fiable.',
            'solution' => 'Application web & mobile, cartographie, messagerie légère et module de paiement intégré.',
            'results' => [
                'Matching trajets en temps réel',
                'Système de notation et confiance',
                'Paiement intégré au parcours',
            ],
            'external_url' => null,
            'changefreq' => 'yearly',
            'priority' => 0.7,
        ],
    ],

    'pages' => [
        [
            'path' => '/',
            'meta_title' => 'ArisTech | Agence Web & Applications à Conakry, Guinée',
            'meta_description' => 'ArisTech, agence web à Conakry : sites internet sur mesure, applications web & mobile, e-commerce et intégration. Devis gratuit sous 24 h.',
            'schema_type' => 'WebPage',
            'changefreq' => 'weekly',
            'priority' => 1.0,
            'image' => '/images/aristech/aristech.jpeg',
            'sources' => [
                'resources/js/pages/marketing/home.tsx',
                'resources/js/data/aristech-seo.ts',
                'config/seo.php',
            ],
        ],
        [
            'path' => '/realisations',
            'meta_title' => 'Réalisations web & mobile | Portfolio ArisTech Guinée',
            'meta_description' => 'Portfolio ArisTech : plateformes FinTech, e-commerce et applications web livrées pour des clients en Guinée et en Afrique.',
            'schema_type' => 'CollectionPage',
            'changefreq' => 'monthly',
            'priority' => 0.8,
            'image' => '/images/aristech/aristech.jpeg',
            'sources' => [
                'resources/js/pages/marketing/realisations.tsx',
                'resources/js/data/aristech-content.ts',
            ],
        ],
        [
            'path' => '/a-propos',
            'meta_title' => 'ArisTech Guinée | Développeur web & agence digitale à Conakry',
            'meta_description' => 'ArisTech, agence digitale à Conakry fondée par Aristide Gnimassou : sites internet, applications web & mobile et e-commerce en Guinée.',
            'schema_type' => 'AboutPage',
            'changefreq' => 'monthly',
            'priority' => 0.8,
            'image' => '/images/aristech/about/hero.jpg',
            'og_image_alt' => 'Équipe ArisTech — agence web à Conakry',
            'sources' => [
                'resources/js/pages/marketing/about.tsx',
                'resources/js/components/marketing/about-approach-section.tsx',
            ],
        ],
        [
            'path' => '/creation-site',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/services/Sites-Internet.jpg',
            'sources' => [
                'resources/js/pages/marketing/creation-site.tsx',
                'resources/js/data/aristech-services.ts',
            ],
        ],
        [
            'path' => '/integrateur-solutions',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/services/API.jpg',
            'sources' => [
                'resources/js/pages/marketing/integrateur-solutions.tsx',
                'resources/js/data/aristech-services.ts',
            ],
        ],
        [
            'path' => '/woocommerce',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/services/E-commerce.jpg',
            'sources' => [
                'resources/js/pages/marketing/woocommerce.tsx',
                'resources/js/data/aristech-services.ts',
            ],
        ],
        [
            'path' => '/application-web',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/services/conakry-women-app.png',
            'sources' => [
                'resources/js/pages/marketing/application-web.tsx',
                'resources/js/data/aristech-services.ts',
            ],
        ],
        [
            'path' => '/seo',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/services/seo.jpg',
            'sources' => [
                'resources/js/pages/marketing/referencement-seo.tsx',
                'resources/js/data/aristech-services.ts',
            ],
        ],
        [
            'path' => '/contact',
            'meta_title' => 'Devis site web Guinée | Contacter ArisTech à Conakry',
            'meta_description' => 'Contactez ArisTech à Conakry pour un devis : site internet, application web, boutique en ligne ou intégration. Réponse sous 24 h.',
            'schema_type' => 'ContactPage',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/hero/digital-services-contact.jpg',
            'og_image_alt' => 'Contacter ArisTech pour un devis web à Conakry',
            'sources' => [
                'resources/js/pages/marketing/contact.tsx',
                'resources/js/data/aristech-contact.ts',
                'config/seo.php',
            ],
        ],
    ],

    'robots_disallow' => [
        '/dashboard',
        '/analytics',
        '/users',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/verify-email',
        '/two-factor-challenge',
        '/confirm-password',
        '/settings',
        '/api',
    ],

    /*
    |--------------------------------------------------------------------------
    | AI / Answer Engine crawlers (AEO)
    |--------------------------------------------------------------------------
    | Explicit Allow for public marketing pages while keeping admin paths blocked.
    */
    'ai_crawlers' => [
        'GPTBot',
        'ChatGPT-User',
        'OAI-SearchBot',
        'anthropic-ai',
        'ClaudeBot',
        'PerplexityBot',
        'Google-Extended',
    ],

];
