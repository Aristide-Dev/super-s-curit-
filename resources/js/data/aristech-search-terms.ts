/**
 * Termes de recherche cibles — source unique pour SEO, AEO et contenu marketing.
 * Stack par défaut : sites et apps sur mesure (Laravel, React).
 * E-commerce : boutique en ligne, WooCommerce ou Shopify si pertinent.
 */
export const aristechSearchTerms = {
    brand: [
        'ArisTech',
        'ARISTECH',
        'ArisTech Guinée',
        'aristech guinée',
        'aristechguinee',
        'aristechguinee.com',
        'Aristide Gnimassou',
        'agence ArisTech',
    ],

    location: ['Guinée', 'Conakry', "Afrique de l'Ouest", 'Guinée Conakry'],

    web: [
        'création site internet',
        'création site web',
        'création site internet Guinée',
        'création site web Afrique',
        'créer un site internet en Guinée',
        'agence web',
        'agence web Conakry',
        "agence web Afrique de l'Ouest",
        'agence digitale Conakry',
        'agence digitale Afrique',
        'développement web',
        'développement web Conakry',
        'développeur web',
        'développeur web Guinée',
        'développeur web Afrique francophone',
        'site vitrine',
        'site institutionnel',
        'application web',
        'application web Conakry',
        'application mobile',
        'développement sur mesure',
        'site sur mesure Guinée',
        'développement application web sur mesure',
        'intégrateur de solutions',
        'Intégrateur de solutions',
        'intégration API',
        'intégration API Conakry',
        'référencement SEO',
        'maintenance site web',
        'maintenance site web Guinée',
    ],

    ecommerce: [
        'boutique en ligne',
        'e-commerce',
        'boutique en ligne Guinée',
        'création boutique en ligne',
        'création boutique en ligne Guinée',
        'Site e-commerce',
        'WooCommerce',
        'boutique WooCommerce Guinée',
        'Shopify',
    ],

    seo: [
        'référencement SEO',
        'Référencement SEO',
        'référencement naturel Guinée',
        'référencement naturel Afrique',
        "référencement naturel Afrique de l'Ouest",
        'référencement Google Afrique',
        'référencement Google Guinée',
        "référencement Google Afrique de l'Ouest",
        'SEO local Afrique',
        "SEO local Afrique de l'Ouest",
        'SEO local',
        'agence SEO Guinée',
        'agence SEO Afrique',
        "agence SEO Afrique de l'Ouest",
        'Audit SEO',
        'consultant SEO Conakry',
        'optimisation SEO site web',
        'visibilité Google Guinée',
        'expert SEO Afrique',
        'référencement site internet',
        'positionnement Google Guinée',
        'optimisation Google My Business',
    ],

    intent: [
        'devis site web',
        'devis gratuit',
        'devis e-commerce',
        'prix site internet',
        'prix création site web Guinée',
        'freelance développeur',
        'studio digital',
        'PME',
        'startup',
    ],
} as const;

export function buildMetaKeywords(
    ...groups: readonly (readonly string[])[]
): string {
    return [...new Set(groups.flat())].join(', ');
}

export const aristechMetaKeywords = {
    home: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.web,
        aristechSearchTerms.ecommerce,
        aristechSearchTerms.seo,
        aristechSearchTerms.intent,
    ),
    about: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.web,
        [
            'agence web Guinée',
            'développeur web Conakry',
            'studio digital',
            'expertise technique',
            'Aristide Gnimassou',
        ],
    ),
    contact: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.web,
        aristechSearchTerms.ecommerce,
        aristechSearchTerms.seo,
        [
            'devis site web Guinée',
            'contact agence web Conakry',
            'devis gratuit',
        ],
    ),
    seo: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.seo,
        [
            'agence web Conakry',
            'Référencement SEO',
            'Audit SEO',
            'SEO local',
        ],
    ),
    applicationWeb: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.web,
        [
            'application web Conakry',
            'développement application web sur mesure',
            'développeur web Guinée',
        ],
    ),
    creationSite: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.web,
        ['création site internet Guinée', 'site sur mesure Guinée'],
    ),
    woocommerce: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.ecommerce,
        [
            'boutique en ligne Guinée',
            'création boutique en ligne Guinée',
            'Site e-commerce Guinée',
        ],
    ),
    integrateurSolutions: buildMetaKeywords(
        aristechSearchTerms.brand,
        aristechSearchTerms.location,
        aristechSearchTerms.web,
        [
            'intégrateur de solutions Guinée',
            'intégration API Conakry',
            'développement sur mesure',
        ],
    ),
} as const;
