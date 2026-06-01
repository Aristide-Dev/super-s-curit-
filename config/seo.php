<?php

return [

    'site_name' => env('SEO_SITE_NAME', 'ARISTECH'),

    'default_description' => env(
        'SEO_DEFAULT_DESCRIPTION',
        'ArisTech — agence web à Conakry, Guinée : création de site internet sur mesure, applications web, sites WordPress et boutiques WooCommerce. Devis gratuit, SEO et maintenance.',
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
        'description' => 'ArisTech est une agence web fondée à Conakry (Guinée) par Aristide Gnimassou. Développement de sites internet sur mesure, applications web, refonte, e-commerce WooCommerce et maintenance WordPress en Guinée, en Afrique de l\'Ouest et pour l\'Afrique francophone.',
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
            'name' => 'Création de site internet en Guinée',
            'description' => 'Sites vitrines, sites WordPress et sites institutionnels sur mesure à Conakry et en Guinée : design, référencement SEO, performances et interface d\'administration adaptée à vos besoins.',
        ],
        [
            'name' => 'Boutique WooCommerce en Guinée',
            'description' => 'Création de boutique en ligne en Guinée avec WordPress WooCommerce ou Shopify : catalogue, paiement mobile money/carte, stocks, SEO produits et tunnel d\'achat optimisé.',
        ],
        [
            'name' => 'Application web sur mesure à Conakry',
            'description' => 'Développement d\'applications web sur mesure à Conakry : produits numériques, API, tableaux de bord, portails clients et outils métier pour PME et startups.',
        ],
        [
            'name' => 'Refonte, SEO & maintenance WordPress',
            'description' => 'Refonte de site web à Conakry, audit SEO, optimisation technique, suivi Analytics et contrats de maintenance WordPress en Guinée après mise en ligne.',
        ],
    ],

    'knows_about' => [
        'ArisTech Guinée',
        'agence web Conakry',
        'création site internet Guinée',
        'développeur web Guinée',
        'site WordPress Guinée',
        'boutique WooCommerce Guinée',
        'application web Conakry',
        'développement web Conakry',
        'créer un site internet en Guinée',
        'prix création site web Guinée',
        'agence digitale Conakry',
        'développeur WordPress Conakry',
        'site e-commerce Guinée prix',
        'création boutique en ligne Guinée',
        'agence web Afrique de l\'Ouest',
        'développeur web Afrique francophone',
        'création site web Afrique',
        'agence digitale Afrique',
        'site sur mesure Guinée',
        'développement application web sur mesure',
        'intégration WooCommerce Guinée',
        'refonte site web Conakry',
        'maintenance site WordPress Guinée',
        'développement web Guinée',
        'WordPress',
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
