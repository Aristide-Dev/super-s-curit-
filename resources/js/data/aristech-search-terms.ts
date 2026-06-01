/**
 * Termes de recherche cibles — source unique pour SEO, AEO et contenu marketing.
 * Sites vitrines/apps : formulation neutre (sans stack imposée).
 * E-commerce : WordPress / WooCommerce / Shopify explicitement.
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

    /** Sites web, applications — sans mention CMS. */
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
        'refonte site internet',
        'refonte site web Conakry',
        'intégration API',
        'référencement SEO',
        'maintenance site web',
        'maintenance site WordPress Guinée',
    ],

    /** Boutiques en ligne uniquement. */
    ecommerce: [
        'boutique en ligne',
        'e-commerce',
        'WooCommerce',
        'boutique WooCommerce Guinée',
        'Shopify',
        'site WordPress Guinée',
        'WordPress e-commerce',
        'développeur WordPress Conakry',
        'intégration WooCommerce Guinée',
        'création boutique en ligne',
        'création boutique en ligne Guinée',
        'site e-commerce Guinée prix',
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
        [
            'devis site web Guinée',
            'contact agence web Conakry',
            'devis gratuit',
        ],
    ),
} as const;
