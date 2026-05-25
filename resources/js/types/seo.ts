export type SeoSharedProps = {
    siteName: string;
    siteUrl: string;
    locale: string;
    language: string;
    twitterSite: string | null;
    defaultImage: string;
    organization: {
        name: string;
        legalName: string;
        founder: string;
        description: string;
        email: string;
        phone: string;
        areaServed: string;
        addressCountry: string;
    };
};
