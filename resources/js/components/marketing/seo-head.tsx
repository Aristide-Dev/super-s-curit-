import { Head, usePage } from '@inertiajs/react';
import {
    aristechSeoPages,
    type SeoPageKey,
} from '@/data/aristech-seo';
import { buildPageJsonLd } from '@/lib/seo-json-ld';
import type { SeoSharedProps } from '@/types/seo';

type PageProps = {
    seo: SeoSharedProps;
};

export default function SeoHead({ page }: { page: SeoPageKey }) {
    const { seo } = usePage<PageProps>().props;
    const meta = aristechSeoPages[page];
    const canonical = `${seo.siteUrl}${meta.path}`;
    const image = meta.image
        ? meta.image.startsWith('http')
            ? meta.image
            : `${seo.siteUrl}${meta.image}`
        : seo.defaultImage;
    const jsonLd = buildPageJsonLd(page, meta, seo, canonical);

    return (
        <Head>
            <title head-key="title">{meta.title}</title>
            <meta
                head-key="description"
                name="description"
                content={meta.description}
            />
            {meta.keywords && (
                <meta
                    head-key="keywords"
                    name="keywords"
                    content={meta.keywords}
                />
            )}
            <link head-key="canonical" rel="canonical" href={canonical} />
            <link
                head-key="hreflang"
                rel="alternate"
                hrefLang={seo.language}
                href={canonical}
            />
            <link
                head-key="hreflang-x-default"
                rel="alternate"
                hrefLang="x-default"
                href={canonical}
            />
            <meta
                head-key="robots"
                name="robots"
                content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
            />
            <meta head-key="author" name="author" content={seo.organization.founder} />
            <meta
                head-key="geo.region"
                name="geo.region"
                content={seo.geo.region}
            />
            <meta
                head-key="geo.placename"
                name="geo.placename"
                content={seo.geo.placename}
            />

            <meta head-key="og:type" property="og:type" content={meta.type ?? 'website'} />
            <meta head-key="og:locale" property="og:locale" content={seo.locale} />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={seo.siteName}
            />
            <meta head-key="og:title" property="og:title" content={meta.title} />
            <meta
                head-key="og:description"
                property="og:description"
                content={meta.description}
            />
            <meta head-key="og:url" property="og:url" content={canonical} />
            <meta head-key="og:image" property="og:image" content={image} />
            <meta
                head-key="og:image:width"
                property="og:image:width"
                content={String(seo.ogImage.width)}
            />
            <meta
                head-key="og:image:height"
                property="og:image:height"
                content={String(seo.ogImage.height)}
            />
            <meta
                head-key="og:image:type"
                property="og:image:type"
                content={seo.ogImage.type}
            />
            <meta
                head-key="og:image:alt"
                property="og:image:alt"
                content={`${seo.siteName} — développement web et mobile en Guinée`}
            />

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            {seo.twitterSite && (
                <meta
                    head-key="twitter:site"
                    name="twitter:site"
                    content={seo.twitterSite}
                />
            )}
            <meta head-key="twitter:title" name="twitter:title" content={meta.title} />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={meta.description}
            />
            <meta head-key="twitter:image" name="twitter:image" content={image} />
            <meta
                head-key="twitter:image:alt"
                name="twitter:image:alt"
                content={`${seo.siteName} — développement web et mobile en Guinée`}
            />
            <meta head-key="twitter:url" name="twitter:url" content={canonical} />

            <script
                head-key="jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </Head>
    );
}
