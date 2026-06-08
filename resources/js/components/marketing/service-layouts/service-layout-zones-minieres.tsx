import { Check, Mountain, Shield } from 'lucide-react';
import ServiceFaq from '@/components/marketing/service-faq';
import ServiceGallery from '@/components/marketing/service-gallery';
import CtaBand from '@/components/marketing/cta-band';
import MarketingFullscreenHero from '@/components/marketing/marketing-fullscreen-hero';
import Reveal from '@/components/marketing/reveal';
import type { ServicePageLayoutProps } from '@/components/marketing/service-layouts/types';

export default function ServiceLayoutZonesMinieres({
    content,
    faqs,
}: ServicePageLayoutProps) {
    return (
        <>
            <MarketingFullscreenHero {...content.hero} />

            <section className="service-zones-bg border-b border-super-securite-border py-14 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <Reveal>
                            <div className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full border border-super-securite-accent/20 bg-white shadow-sm">
                                <Mountain
                                    className="size-6 text-super-securite-accent"
                                    aria-hidden
                                />
                            </div>
                            <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                                Sites sensibles,{' '}
                                <span className="text-super-securite-accent">
                                    protocoles stricts
                                </span>
                            </h2>
                        </Reveal>
                        <div className="mt-6 space-y-4">
                            {content.intro.map((paragraph, index) => (
                                <Reveal
                                    key={paragraph.slice(0, 40)}
                                    delay={index * 90}
                                >
                                    <p className="text-sm leading-relaxed text-super-securite-muted sm:text-base">
                                        {paragraph}
                                    </p>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <Reveal delay={220} className="mt-10 grid gap-4 sm:grid-cols-3">
                        {content.benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="rounded-xl border border-super-securite-border bg-white px-4 py-4 text-center shadow-sm"
                            >
                                <Shield
                                    className="mx-auto size-5 text-super-securite-accent"
                                    aria-hidden
                                />
                                <p className="mt-2 text-sm font-semibold text-super-securite-heading">
                                    {benefit}
                                </p>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className="bg-white py-14 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mb-10 max-w-2xl">
                        <p className="marketing-label mb-2">Opérations terrain</p>
                        <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                            Maîtrise des environnements à risque
                        </h2>
                    </Reveal>

                    <div className="grid gap-4 md:grid-cols-2">
                        {content.sections.map((section, index) => (
                            <Reveal key={section.title} delay={index * 80}>
                                <article className="marketing-card h-full border-l-4 border-l-super-securite-accent">
                                    <p className="font-heading text-xs font-semibold tracking-widest text-super-securite-muted uppercase">
                                        Pilier {index + 1}
                                    </p>
                                    <h3 className="font-heading mt-2 text-lg font-semibold text-super-securite-heading">
                                        {section.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-super-securite-muted">
                                        {section.description}
                                    </p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="marketing-section-band py-14 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
                        <Reveal className="lg:col-span-2">
                            <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                                Conformité & dispositif
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-super-securite-muted">
                                Briefings, EPI, checkpoints et remontées
                                d&apos;incidents adaptés à vos procédures HSE.
                            </p>
                        </Reveal>
                        <Reveal delay={120} className="lg:col-span-3">
                            <ul className="grid gap-3 sm:grid-cols-2">
                                {content.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 rounded-lg border border-super-securite-border bg-white px-4 py-3 text-sm text-super-securite-heading shadow-sm"
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
                </div>
            </section>

            <ServiceGallery
                variant="filmstrip"
                title={content.galleryTitle}
                description={content.galleryDescription}
                images={content.gallery}
            />

            <ServiceFaq faqs={faqs} />
            <CtaBand />
        </>
    );
}
