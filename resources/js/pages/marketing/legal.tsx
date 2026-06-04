import { usePage } from '@inertiajs/react';
import SeoHead from '@/components/marketing/seo-head';
import PageHero from '@/components/marketing/page-hero';
import Reveal from '@/components/marketing/reveal';
import type { AristechConfig } from '@/types/aristech';

type PageProps = {
    aristech: AristechConfig;
};

export default function LegalPage() {
    const { aristech } = usePage<PageProps>().props;

    return (
        <>
            <SeoHead />

            <PageHero
                label="Légal"
                title="Mentions légales"
                description="Informations légales relatives au site aristechguinee.com."
                align="center"
            />

            <section className="pb-24">
                <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8 text-sm leading-relaxed text-aristech-muted">
                    <Reveal>
                        <p>
                            <strong className="text-aristech-heading">Éditeur :</strong>{' '}
                            ArisTech (ARISTECH) — agence web à Conakry, Guinée.
                        </p>
                    </Reveal>
                    {aristech.rccm && (
                        <Reveal delay={60}>
                            <p>
                                <strong className="text-aristech-heading">RCCM :</strong>{' '}
                                {aristech.rccm}
                            </p>
                        </Reveal>
                    )}
                    <Reveal delay={120}>
                        <p>
                            <strong className="text-aristech-heading">Contact :</strong>{' '}
                            <a href={`mailto:${aristech.email}`} className="text-aristech-accent">
                                {aristech.email}
                            </a>{' '}
                            —{' '}
                            <a href={aristech.phone_href} className="text-aristech-accent">
                                {aristech.phone}
                            </a>
                        </p>
                    </Reveal>
                    <Reveal delay={180}>
                        <p>
                            <strong className="text-aristech-heading">Directeur de publication :</strong>{' '}
                            Aristide Gnimassou.
                        </p>
                    </Reveal>
                    <Reveal delay={240}>
                        <p>
                            <strong className="text-aristech-heading">Hébergement :</strong>{' '}
                            Hostinger International Ltd. — site accessible via HTTPS.
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
