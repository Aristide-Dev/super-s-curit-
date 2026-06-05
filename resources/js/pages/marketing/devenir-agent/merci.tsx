import { Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import SeoHead from '@/components/marketing/seo-head';
import { home } from '@/routes';

export default function MarketingDevenirAgentMerci() {
    return (
        <>
            <SeoHead />

            <section className="marketing-section-band py-20">
                <div className="container mx-auto max-w-2xl px-4 text-center">
                    <div className="marketing-card mx-auto max-w-lg p-10">
                        <CheckCircle2 className="text-super-securite-accent mx-auto size-14" />
                        <h1 className="marketing-heading-section mt-6">
                            Candidature envoyée
                        </h1>
                        <p className="text-super-securite-muted mt-4 text-sm leading-relaxed">
                            Merci pour votre inscription. Notre équipe RH
                            examinera votre profil et vous contactera si une
                            opportunité correspond à votre localisation et votre
                            expérience.
                        </p>
                        <Link
                            href={home.url()}
                            className="marketing-cta-primary mt-8 inline-flex"
                        >
                            Retour à l&apos;accueil
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
