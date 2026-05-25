import type { SeoPageMeta } from '@/data/aristech-seo';
import type { SeoSharedProps } from '@/types/seo';

export function buildPageJsonLd(
    meta: SeoPageMeta,
    seo: SeoSharedProps,
    canonical: string,
): Record<string, unknown> {
    const { organization } = seo;
    const image = meta.image
        ? meta.image.startsWith('http')
            ? meta.image
            : `${seo.siteUrl}${meta.image}`
        : seo.defaultImage;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${seo.siteUrl}/#organization`,
                name: organization.name,
                legalName: organization.legalName,
                url: seo.siteUrl,
                logo: seo.defaultImage,
                description: organization.description,
                email: organization.email,
                telephone: organization.phone,
                founder: {
                    '@type': 'Person',
                    name: organization.founder,
                },
                areaServed: organization.areaServed,
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: organization.addressCountry,
                },
            },
            {
                '@type': 'ProfessionalService',
                '@id': `${seo.siteUrl}/#business`,
                name: organization.name,
                url: seo.siteUrl,
                image,
                description: organization.description,
                email: organization.email,
                telephone: organization.phone,
                priceRange: '$$',
                areaServed: organization.areaServed,
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: organization.addressCountry,
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${seo.siteUrl}/#website`,
                url: seo.siteUrl,
                name: seo.siteName,
                description: organization.description,
                inLanguage: seo.language,
                publisher: { '@id': `${seo.siteUrl}/#organization` },
            },
            {
                '@type': 'WebPage',
                '@id': `${canonical}#webpage`,
                url: canonical,
                name: meta.title,
                description: meta.description,
                isPartOf: { '@id': `${seo.siteUrl}/#website` },
                about: { '@id': `${seo.siteUrl}/#organization` },
                inLanguage: seo.language,
            },
        ],
    };
}
