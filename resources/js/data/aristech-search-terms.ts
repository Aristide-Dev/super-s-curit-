/**
 * Termes de recherche cibles — source unique pour SEO, AEO et contenu marketing.
 * Sites vitrines/apps : formulation neutre (sans stack imposée).
 * E-commerce : WordPress / WooCommerce / Shopify explicitement.
 */
export const aristechSearchTerms = {
    brand: ['ArisTech', 'ARISTECH', 'Aristide Gnimassou'],

    location: [
        'Guinée',
        'Conakry',
        'Afrique de l\'Ouest',
    ],

    /** Sites web, applications — sans mention CMS. */
    web: [
        'création site internet',
        'création site web',
        'agence web',
        'développement web',
        'développeur web',
        'site vitrine',
        'site institutionnel',
        'application web',
        'application mobile',
        'développement sur mesure',
        'refonte site internet',
        'intégration API',
        'référencement SEO',
        'maintenance site web',
    ],

    /** Boutiques en ligne uniquement. */
    ecommerce: [
        'boutique en ligne',
        'e-commerce',
        'WooCommerce',
        'Shopify',
        'WordPress e-commerce',
        'création boutique en ligne',
    ],

    intent: [
        'devis site web',
        'devis gratuit',
        'devis e-commerce',
        'prix site internet',
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
