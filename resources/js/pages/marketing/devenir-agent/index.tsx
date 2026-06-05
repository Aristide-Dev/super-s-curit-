import SeoHead from '@/components/marketing/seo-head';
import PageHero from '@/components/marketing/page-hero';
import SecurityAgentRegistrationForm from '@/components/marketing/security-agent-registration-form';

export default function MarketingDevenirAgent() {
    return (
        <>
            <SeoHead />

            <PageHero
                label="Recrutement"
                title={
                    <>
                        Devenez agent de{' '}
                        <span className="marketing-text-gradient">
                            sécurité
                        </span>
                    </>
                }
                description="Inscrivez-vous sur notre plateforme pour être contacté par Super Sécurité lors de missions de gardiennage, surveillance ou sécurité événementielle en Guinée."
            />

            <section className="marketing-section-band marketing-below-fold py-16">
                <div className="container mx-auto max-w-3xl px-4">
                    <SecurityAgentRegistrationForm />
                </div>
            </section>
        </>
    );
}
