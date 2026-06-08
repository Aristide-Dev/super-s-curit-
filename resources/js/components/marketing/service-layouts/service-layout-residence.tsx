import { Check, Home } from 'lucide-react';
import ServiceFaq from '@/components/marketing/service-faq';
import ServiceGallery from '@/components/marketing/service-gallery';
import CtaBand from '@/components/marketing/cta-band';
import MarketingFullscreenHero from '@/components/marketing/marketing-fullscreen-hero';
import Reveal from '@/components/marketing/reveal';
import type { ServicePageLayoutProps } from '@/components/marketing/service-layouts/types';
import { cn } from '@/lib/utils';

export default function ServiceLayoutResidence({
    content,
    faqs,
}: ServicePageLayoutProps) {
    return (
        <>
            <MarketingFullscreenHero {...content.hero} />

            <section className="relative overflow-hidden bg-linear-to-b from-rose-50/80 via-white to-white py-14 md:py-20">
                <div
                    className="pointer-events-none absolute -top-24 right-0 size-64 rounded-full bg-super-securite-accent/5 blur-3xl"
                    aria-hidden
                />
                <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
                    <Reveal>
                        <div className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full border border-super-securite-accent/20 bg-white shadow-sm">
                            <Home
                                className="size-6 text-super-securite-accent"
                                aria-hidden
                            />
                        </div>
                        <h2 className="font-heading text-2xl font-bold tracking-tight text-super-securite-heading sm:text-3xl">
                            La sérénité au quotidien,{' '}
                            <span className="text-super-securite-accent">
                                chez vous
                            </span>
                        </h2>
                    </Reveal>
                    <div className="mt-6 space-y-4">
                        {content.intro.map((paragraph, index) => (
                            <Reveal key={paragraph.slice(0, 40)} delay={index * 100}>
                                <p className="text-sm leading-relaxed text-super-securite-muted sm:text-base">
                                    {paragraph}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={280} className="mt-8 flex flex-wrap justify-center gap-3">
                        {content.benefits.map((benefit) => (
                            <span
                                key={benefit}
                                className="rounded-full border border-super-securite-border bg-white px-4 py-2 text-sm font-semibold text-super-securite-heading shadow-sm"
                            >
                                {benefit}
                            </span>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className="bg-white py-14 md:py-16">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mb-12 text-center">
                        <p className="marketing-label mb-2">Notre accompagnement</p>
                        <h2 className="font-heading text-2xl font-bold text-super-securite-heading sm:text-3xl">
                            Protéger votre cadre de vie
                        </h2>
                    </Reveal>

                    <div className="space-y-16">
                        {content.sections.map((section, index) => {
                            const image = content.gallery[index % content.gallery.length];
                            const imageRight = index % 2 === 1;

                            return (
                                <Reveal key={section.title} delay={index * 80}>
                                    <div
                                        className={cn(
                                            'grid items-center gap-8 md:grid-cols-2',
                                            imageRight && 'md:[&>*:first-child]:order-2',
                                        )}
                                    >
                                        {image ? (
                                            <div className="overflow-hidden rounded-3xl border border-super-securite-border shadow-lg shadow-slate-900/5">
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    width={720}
                                                    height={540}
                                                    loading="lazy"
                                                    className="aspect-[4/3] w-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div aria-hidden />
                                        )}
                                        <div>
                                            <p className="font-heading text-sm font-semibold text-super-securite-accent">
                                                {String(index + 1).padStart(2, '0')}
                                            </p>
                                            <h3 className="font-heading mt-2 text-xl font-semibold text-super-securite-heading">
                                                {section.title}
                                            </h3>
                                            <p className="mt-4 text-sm leading-relaxed text-super-securite-muted">
                                                {section.description}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="marketing-section-band py-14 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal className="mx-auto max-w-3xl rounded-3xl border border-super-securite-border bg-white p-8 shadow-lg shadow-slate-900/5 md:p-10">
                        <h2 className="font-heading text-center text-2xl font-bold text-super-securite-heading">
                            Ce que nous mettons en place
                        </h2>
                        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                            {content.includes.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-super-securite-heading"
                                >
                                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-super-securite-accent/15 text-super-securite-accent">
                                        <Check className="size-3.5" aria-hidden />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            <ServiceGallery
                variant="grid"
                title={content.galleryTitle}
                description={content.galleryDescription}
                images={content.gallery}
                className="bg-white"
            />

            <ServiceFaq faqs={faqs} />
            <CtaBand />
        </>
    );
}
