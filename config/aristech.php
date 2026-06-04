<?php

return [

    'email' => env('ARISTECH_CONTACT_EMAIL', 'contact@supersecurite.com'),

    'phone' => env('ARISTECH_CONTACT_PHONE', '+224 612 13 13 14'),

    'phone_secondary' => env('ARISTECH_CONTACT_PHONE_SECONDARY', '+224 612 13 13 15'),

    'phone_href' => env('ARISTECH_CONTACT_PHONE_HREF', 'tel:+224612131314'),

    'address' => env(
        'ARISTECH_ADDRESS',
        'Lambanyi (en face de Cis Media) – Conakry – Rép. de Guinée',
    ),

    'social' => [
        'facebook' => env('ARISTECH_FACEBOOK_URL'),
        'twitter' => env('ARISTECH_TWITTER_URL'),
        'youtube' => env('ARISTECH_YOUTUBE_URL'),
        'instagram' => env('ARISTECH_INSTAGRAM_URL'),
        'linkedin' => env('ARISTECH_LINKEDIN_URL'),
        'github' => env('ARISTECH_GITHUB_URL'),
    ],

    'mail_to' => env('ARISTECH_MAIL_TO', env('ARISTECH_CONTACT_EMAIL', 'contact@supersecurite.com')),

    'rccm' => env('ARISTECH_RCCM'),

];
