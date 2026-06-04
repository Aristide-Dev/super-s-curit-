<?php

return [

    'email' => env('ARISTECH_CONTACT_EMAIL', 'contact@aristechguinee.com'),

    'phone' => env('ARISTECH_CONTACT_PHONE', '+224 621 630 916'),

    'phone_href' => env('ARISTECH_CONTACT_PHONE_HREF', 'tel:+224621630916'),

    'social' => [
        'facebook' => env('ARISTECH_FACEBOOK_URL', 'https://www.facebook.com/people/ArisTech/61590208905047/'),
        'twitter' => env('ARISTECH_TWITTER_URL'),
        'instagram' => env('ARISTECH_INSTAGRAM_URL', 'https://www.instagram.com/aristech.gn'),
        'linkedin' => env('ARISTECH_LINKEDIN_URL'),
        'github' => env('ARISTECH_GITHUB_URL', 'https://github.com/Aristech-Dev'),
    ],

    'mail_to' => env('ARISTECH_MAIL_TO', env('ARISTECH_CONTACT_EMAIL', 'contact@aristechguinee.com')),

    'rccm' => env('ARISTECH_RCCM', 'GN.TCC.2024.A.04948'),

];
