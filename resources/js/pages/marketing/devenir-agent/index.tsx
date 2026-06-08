import SeoHead from '@/components/marketing/seo-head';
import MarketingFullscreenHero from '@/components/marketing/marketing-fullscreen-hero';
import SecurityAgentRegistrationForm from '@/components/marketing/security-agent-registration-form';
import { marketingPageHeroes } from '@/data/marketing-page-heroes';

export default function MarketingDevenirAgent() {
    return (
        <>
            <SeoHead />

            <MarketingFullscreenHero {...marketingPageHeroes.devenirAgent} />

            <section className="marketing-section-white marketing-below-fold py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <SecurityAgentRegistrationForm />
                </div>
            </section>
        </>
    );
}
