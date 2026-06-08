import { Check, HardHat } from 'lucide-react';
import ServiceFaq from '@/components/marketing/service-faq';
import ServiceGallery from '@/components/marketing/service-gallery';
import CtaBand from '@/components/marketing/cta-band';
import MarketingFullscreenHero from '@/components/marketing/marketing-fullscreen-hero';
import Reveal from '@/components/marketing/reveal';
import type { ServicePageLayoutProps } from '@/components/marketing/service-layouts/types';

export default function ServiceLayoutChantiers({
    content,
    faqs,
}: ServicePageLayoutProps) {
    return (
        <>
            <MarketingFullscreenHero {...content.hero} />

            <section className="service-chantiers-bg border-y border-super-securite-border py-14 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 rounded-lg bg-super-securite-accent px-3 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
                                <HardHat className="size-4" aria-hidden />
                                BTP & travaux
                            </div>
                            <h2 className="font-heading mt-4 text-2xl font-bold tracking-tight text-super-securite-heading sm:text-3xl">
                                Sécuriser l&apos;avancement de vos chantiers
                            </h2>
                            <div className="mt-5 space-y-4">
                                {content.intro.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 40)}
                                        className="text-sm leading-relaxed text-super-securite-muted sm:text-base"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={120} className="flex flex-wrap gap-2">
                            {content.benefits.map((benefit) => (
                                <span
                                    key={benefit}
                                    className="rounded-md border-2 border-super-securite-heading bg-white px-4 py-2 text-sm font-bold text-super-securite-heading shadow-sm"
                                >
                                    {benefit}
                                </span>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="bg-white py-14 md:py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mb-10 text-center">
                        <p className="marketing-label mb-2">Processus terrain</p>
                        <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                            Étapes de sécurisation chantier
                        </h2>
                    </Reveal>

                    <ol className="relative space-y-0 border-l-2 border-super-securite-accent/30 pl-8">
                        {content.sections.map((section, index) => (
                            <Reveal key={section.title} delay={index * 90}>
                                <li className="relative pb-10 last:pb-0">
                                    <span className="absolute -left-[1.65rem] flex size-8 items-center justify-center rounded-full border-2 border-super-securite-accent bg-white font-heading text-xs font-bold text-super-securite-accent">
                                        {index + 1}
                                    </span>
                                    <h3 className="font-heading text-lg font-semibold text-super-securite-heading">
                                        {section.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-super-securite-muted">
                                        {section.description}
                                    </p>
                                </li>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="marketing-section-band py-14 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mb-8 max-w-xl">
                        <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                            Prestations sur site
                        </h2>
                        <p className="mt-3 text-sm text-super-securite-muted">
                            Des équipes rodées aux contraintes chantier :
                            horaires décalés, flux camions, zones de stockage.
                        </p>
                    </Reveal>
                    <Reveal delay={100}>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {content.includes.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 rounded-xl border border-super-securite-border bg-white px-4 py-3 text-sm text-super-securite-heading shadow-sm"
                                >
                                    <Check
                                        className="mt-0.5 size-4 shrink-0 text-super-securite-accent"
                                        aria-hidden
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            <ServiceGallery
                variant="bento"
                title={content.galleryTitle}
                description={content.galleryDescription}
                images={content.gallery}
            />

            <ServiceFaq faqs={faqs} />
            <CtaBand />
        </>
    );
}
