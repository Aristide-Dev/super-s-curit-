import { Head } from '@inertiajs/react';
import MarketingErrorHero from '@/components/marketing/marketing-error-hero';
import {
    marketingErrorPages,
    type MarketingErrorStatus,
} from '@/data/marketing-error-pages';

type MarketingErrorPageProps = {
    status: MarketingErrorStatus;
};

export default function MarketingErrorPage({ status }: MarketingErrorPageProps) {
    const config = marketingErrorPages[status];

    return (
        <>
            <Head>
                <title>{`${config.status} — ${config.title}`}</title>
                <meta
                    name="description"
                    content={config.description}
                />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <MarketingErrorHero config={config} />
        </>
    );
}
