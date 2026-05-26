import { aristechFaqs } from '@/data/aristech-contact';
import type { SeoPageKey, SeoPageMeta } from '@/data/aristech-seo';
import type { SeoSharedProps } from '@/types/seo';

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
            url: seo.siteUrl,
            logo: {
                '@type': 'ImageObject',
                url: seo.defaultImage,
            },
            image: seo.defaultImage,
            description: organization.description,
            email: organization.email,
            telephone: organization.phone,
            founder: {
                '@type': 'Person',
                name: organization.founder,
                jobTitle: organization.founderJobTitle,
                worksFor: { '@id': orgId },
            },
            areaServed: {
                '@type': 'Country',
                name: organization.areaServed,
            },
            address: {
                '@type': 'PostalAddress',
                addressLocality: organization.addressLocality,
                addressCountry: organization.addressCountry,
            },
            ...(seo.sameAs.length > 0 ? { sameAs: seo.sameAs } : {}),
            ...(seo.knowsAbout.length > 0 ? { knowsAbout: seo.knowsAbout } : {}),
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
            url: seo.siteUrl,
            image,
            description: organization.description,
            email: organization.email,
            telephone: organization.phone,
            priceRange: '$$',
            areaServed: organization.areaServed,
            address: {
                '@type': 'PostalAddress',
                addressLocality: organization.addressLocality,
                addressCountry: organization.addressCountry,
            },
            provider: { '@id': orgId },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services ArisTech',
                itemListElement: seo.services.map((service, index) => ({
                    '@type': 'Offer',
                    position: index + 1,
                    itemOffered: {
                        '@type': 'Service',
                        name: service.name,
                        description: service.description,
                        provider: { '@id': orgId },
                        areaServed: organization.areaServed,
                    },
                })),
            },
        },
        {
            '@type': 'WebSite',
            '@id': websiteId,
            url: seo.siteUrl,
            name: seo.siteName,
            description: organization.description,
            inLanguage: seo.language,
            publisher: { '@id': orgId },
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
