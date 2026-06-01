<?php

return [

    'site_name' => env('SEO_SITE_NAME', 'ARISTECH'),

    'default_description' => env(
        'SEO_DEFAULT_DESCRIPTION',
        'ArisTech — agence web à Conakry, Guinée : création de site internet sur mesure, applications web, boutiques en ligne et intégration de solutions. Devis gratuit, SEO et maintenance.',
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
            'description' => 'Développement d\'applications web et mobiles sur mesure à Conakry : tableaux de bord, portails clients, API et outils métier pour PME et startups.',
        ],
        [
            'name' => 'Création de site internet',
            'description' => 'Sites vitrines et institutionnels sur mesure : design, performances, référencement naturel et stack moderne (Laravel, React).',
        ],
        [
            'name' => 'Boutique en ligne',
            'description' => 'Boutique en ligne en Guinée : catalogue, paiement mobile money ou carte, stocks, SEO produits et tunnel d\'achat optimisé.',
        ],
        [
            'name' => 'Intégrateur de solutions',
            'description' => 'Intégration API, CRM, paiements et automatisations à Conakry pour connecter vos outils métier et faire évoluer vos plateformes.',
        ],
        [
            'name' => 'Référencement SEO',
            'description' => 'Audit SEO, référencement naturel, SEO local à Conakry, optimisation Google et suivi Analytics pour améliorer votre visibilité.',
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

    'pages' => [
        [
            'path' => '/',
            'changefreq' => 'weekly',
            'priority' => 1.0,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/a-propos',
            'changefreq' => 'monthly',
            'priority' => 0.8,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/creation-site',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/integrateur-solutions',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/woocommerce',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/application-web',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/seo',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/aristech.jpeg',
        ],
        [
            'path' => '/contact',
            'changefreq' => 'monthly',
            'priority' => 0.9,
            'image' => '/images/aristech/aristech.jpeg',
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
