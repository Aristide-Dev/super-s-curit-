import { Building2, Check } from 'lucide-react';
import ServiceFaq from '@/components/marketing/service-faq';
import ServiceGallery from '@/components/marketing/service-gallery';
import CtaBand from '@/components/marketing/cta-band';
import MarketingFullscreenHero from '@/components/marketing/marketing-fullscreen-hero';
import Reveal from '@/components/marketing/reveal';
import type { ServicePageLayoutProps } from '@/components/marketing/service-layouts/types';

export default function ServiceLayoutEntreprise({
    content,
    faqs,
}: ServicePageLayoutProps) {
    const spotlight = content.gallery[0];

    return (
        <>
            <MarketingFullscreenHero {...content.hero} />

            <section className="bg-white py-14 md:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
                    {spotlight ? (
                        <Reveal
                            variant="fade"
                            className="lg:col-span-5 lg:sticky lg:top-28"
                        >
                            <div className="overflow-hidden rounded-2xl border border-super-securite-border shadow-xl shadow-slate-900/10 ring-4 ring-super-securite-accent/10">
                                <img
                                    src={spotlight.src}
                                    alt={spotlight.alt}
                                    width={800}
                                    height={600}
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            </div>
                        </Reveal>
                    ) : null}

                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="marketing-label mb-3 flex items-center gap-2 before:block before:h-px before:w-6 before:bg-super-securite-accent">
                                Corporate & retail
                            </p>
                            <h2 className="font-heading text-2xl font-bold tracking-tight text-super-securite-heading sm:text-3xl">
                                Une sécurité alignée sur vos{' '}
                                <span className="text-super-securite-accent">
                                    exigences métier
                                </span>
                            </h2>
                        </Reveal>

                        <div className="mt-6 space-y-4">
                            {content.intro.map((paragraph, index) => (
                                <Reveal key={paragraph.slice(0, 40)} delay={index * 80}>
                                    <p className="text-sm leading-relaxed text-super-securite-muted sm:text-base">
                                        {paragraph}
                                    </p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={240} className="mt-8 grid gap-3 sm:grid-cols-3">
                            {content.benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-3 rounded-xl border border-super-securite-border bg-slate-50 px-4 py-3"
                                >
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-super-securite-accent/10 text-super-securite-accent">
                                        <Building2 className="size-4" aria-hidden />
                                    </span>
                                    <span className="text-sm font-semibold text-super-securite-heading">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="marketing-section-band py-14 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mb-10 max-w-2xl">
                        <p className="marketing-label mb-2">Méthodologie</p>
                        <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                            Organisation terrain pour sites professionnels
                        </h2>
                    </Reveal>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {content.sections.map((section, index) => (
                            <Reveal key={section.title} delay={index * 80}>
                                <article className="marketing-card h-full">
                                    <p className="font-heading text-3xl font-bold text-super-securite-accent/80">
                                        {String(index + 1).padStart(2, '0')}
                                    </p>
                                    <h3 className="font-heading mt-3 text-lg font-semibold text-super-securite-heading">
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
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                        <Reveal>
                            <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                                Livrables & prestations
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-super-securite-muted sm:text-base">
                                Un dispositif structuré, mesurable et évolutif
                                selon la taille de votre structure.
                            </p>
                        </Reveal>
                        <Reveal delay={120}>
                            <ul className="divide-y divide-super-securite-border rounded-2xl border border-super-securite-border bg-white">
                                {content.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 px-5 py-4 text-sm text-super-securite-heading"
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
                variant="featured"
                title={content.galleryTitle}
                description={content.galleryDescription}
                images={
                    content.gallery.length > 1
                        ? content.gallery.slice(1)
                        : content.gallery
                }
            />

            <ServiceFaq faqs={faqs} />
            <CtaBand />
        </>
    );
}
