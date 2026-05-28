import { aristechFaqs } from '@/data/aristech-contact';
import type { SeoPageKey, SeoPageMeta } from '@/data/aristech-seo';
import type { SeoService, SeoSharedProps } from '@/types/seo';

/**
 * OfferCatalog items use ListItem + position (valid on ListItem),
 * not position on Offer (invalid per schema.org).
 */
export function buildOfferCatalogItems(
    services: SeoService[],
    orgId: string,
    areaServed: string,
): Record<string, unknown>[] {
    return services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Offer',
            itemOffered: {
                '@type': 'Service',
                name: service.name,
                description: service.description,
                provider: { '@id': orgId },
                areaServed,
            },
        },
    }));
}

export function buildPageJsonLd(
    page: SeoPageKey,
    meta: SeoPageMeta,
    seo: SeoSharedProps,
    canonical: string,
): Record<string, unknown> {
    const { organization } = seo;
    const image = resolveImage(meta.image, seo);
    const orgId = `${seo.siteUrl}/#organization`;
    const businessId = `${seo.siteUrl}/#business`;
    const websiteId = `${seo.siteUrl}/#website`;
    const webpageId = `${canonical}#webpage`;

    const graph: Record<string, unknown>[] = [
        {
            '@type': 'Organization',
            '@id': orgId,
            name: organization.name,
            legalName: organization.legalName,
            alternateName: organization.alternateName,
            slogan: organization.slogan,
            foundingDate: organization.foundingDate,
            url: seo.siteUrl,
            logo: {
                '@type': 'ImageObject',
                '@id': `${seo.siteUrl}/#logo`,
                url: seo.defaultImage,
                caption: `${organization.name} — agence web Conakry, Guinée`,
            },
            image: {
                '@type': 'ImageObject',
                url: seo.defaultImage,
            },
            description: organization.description,
            email: organization.email,
            telephone: organization.phone,
            identifier: organization.rccm
                ? { '@type': 'PropertyValue', name: 'RCCM', value: organization.rccm }
                : undefined,
            founder: {
                '@type': 'Person',
                '@id': `${seo.siteUrl}/#founder`,
                name: organization.founder,
                jobTitle: organization.founderJobTitle,
                worksFor: { '@id': orgId },
            },
            areaServed: {
                '@type': 'Country',
                name: organization.areaServed,
                '@id': 'https://www.wikidata.org/wiki/Q1006',
            },
            address: {
                '@type': 'PostalAddress',
                streetAddress: organization.addressStreet,
                addressLocality: organization.addressLocality,
                addressCountry: organization.addressCountry,
            },
            ...(seo.sameAs?.length ? { sameAs: seo.sameAs } : {}),
            ...(seo.knowsAbout?.length ? { knowsAbout: seo.knowsAbout } : {}),
        },
        {
            '@type': 'Person',
            '@id': `${seo.siteUrl}/#founder`,
            name: organization.founder,
            jobTitle: organization.founderJobTitle,
            worksFor: { '@id': orgId },
            url: `${seo.siteUrl}/a-propos`,
        },
        {
            '@type': 'ProfessionalService',
            '@id': businessId,
            name: organization.name,
            alternateName: organization.alternateName,
            url: seo.siteUrl,
            image,
            description: organization.description,
            email: organization.email,
            telephone: organization.phone,
            priceRange: '$$',
            openingHours: organization.openingHours,
            areaServed: organization.areaServed,
            address: {
                '@type': 'PostalAddress',
                streetAddress: organization.addressStreet,
                addressLocality: organization.addressLocality,
                addressCountry: organization.addressCountry,
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: organization.geoLatitude,
                longitude: organization.geoLongitude,
            },
            parentOrganization: { '@id': orgId },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services ArisTech Guinée',
                itemListElement: buildOfferCatalogItems(
                    seo.services,
                    orgId,
                    organization.areaServed,
                ),
            },
        },
        {
            '@type': 'WebSite',
            '@id': websiteId,
            url: seo.siteUrl,
            name: seo.siteName,
            alternateName: organization.alternateName,
            description: organization.description,
            inLanguage: seo.language,
            publisher: { '@id': orgId },
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${seo.siteUrl}/?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
            },
        },
        {
            '@type': meta.schemaType,
            '@id': webpageId,
            url: canonical,
            name: meta.title,
            description: meta.description,
            isPartOf: { '@id': websiteId },
            about: { '@id': orgId },
            inLanguage: seo.language,
            primaryImageOfPage: {
                '@type': 'ImageObject',
                url: image,
            },
        },
        buildBreadcrumbList(meta, seo, canonical),
    ];

    if (page === 'contact') {
        graph.push(buildFaqPage(seo, canonical));
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph,
    };
}

function buildBreadcrumbList(
    meta: SeoPageMeta,
    seo: SeoSharedProps,
    canonical: string,
): Record<string, unknown> {
    return {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: meta.breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${seo.siteUrl}${crumb.path === '/' ? '/' : crumb.path}`,
        })),
    };
}

function buildFaqPage(
    seo: SeoSharedProps,
    canonical: string,
): Record<string, unknown> {
    return {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: aristechFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

function resolveImage(path: string | undefined, seo: SeoSharedProps): string {
    if (!path) {
        return seo.defaultImage;
    }

    return path.startsWith('http') ? path : `${seo.siteUrl}${path}`;
}
