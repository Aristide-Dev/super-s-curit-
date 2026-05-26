<?php

return [

    'site_name' => env('SEO_SITE_NAME', 'ARISTECH'),

    'default_description' => env(
        'SEO_DEFAULT_DESCRIPTION',
        'ArisTech — agence web à Conakry, Guinée : création de site internet sur mesure, applications web et boutiques en ligne (WooCommerce, Shopify). Devis gratuit, SEO et maintenance.',
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
        'name' => 'ARISTECH',
        'legal_name' => 'ARISTECH',
        'founder' => 'Aristide Gnimassou',
        'founder_job_title' => 'Fondateur & développeur web',
        'description' => 'Agence web et studio digital à Conakry — sites internet sur mesure, e-commerce (WooCommerce, Shopify), applications web et mobiles, SEO et maintenance en Guinée.',
        'area_served' => 'Guinée',
        'address_country' => 'GN',
        'address_locality' => 'Conakry',
    ],

    'services' => [
        [
            'name' => 'Création de site internet',
            'description' => 'Sites vitrines et institutionnels sur mesure à Conakry et en Guinée : design, référencement SEO, performances et interface d\'administration adaptée à vos besoins.',
        ],
        [
            'name' => 'Boutique en ligne WooCommerce & Shopify',
            'description' => 'E-commerce avec WordPress (WooCommerce) ou Shopify : catalogue, paiement mobile money/carte, stocks et tunnel d\'achat optimisé.',
        ],
        [
            'name' => 'Applications web & mobiles',
            'description' => 'Produits numériques sur mesure, API, tableaux de bord et refonte de sites existants pour PME et startups.',
        ],
        [
            'name' => 'SEO & maintenance site web',
            'description' => 'Audit SEO, optimisation technique, suivi Analytics et contrats de maintenance après mise en ligne.',
        ],
    ],

    'knows_about' => [
        'WordPress',
        'WooCommerce',
        'Shopify',
        'Laravel',
        'React',
        'référencement naturel',
        'création site internet',
        'développement web',
        'e-commerce',
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
