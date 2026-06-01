import Reveal from '@/components/marketing/reveal';
import { aristechApproachPillars } from '@/data/aristech-about';
import { aristechStock } from '@/data/aristech-stock';

export default function AboutApproachSection() {
    return (
        <section className="border-y border-aristech-border bg-aristech-surface/40 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
                    <Reveal className="lg:col-span-5">
                        <p className="marketing-label mb-3">Notre approche</p>
                        <h2 className="marketing-heading-section">
                            Un partenaire technique{' '}
                            <span className="marketing-text-gradient">
                                de bout en bout
                            </span>
                        </h2>
                        <p className="mt-6 text-base leading-relaxed text-aristech-text">
                            De la première discussion au déploiement, nous
                            alignons design, développement et mise en production
                            sur des standards internationaux — sans compromis
                            sur la qualité ni sur la clarté des livrables.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-aristech-muted">
                            Que vous lanciez un site vitrine, une application
                            métier ou une boutique en ligne, la même exigence
                            guide chaque étape du projet.
                        </p>

                        <div className="mt-10 overflow-hidden rounded-2xl border border-aristech-border shadow-md shadow-slate-900/5">
                            <img
                                src={aristechStock.about.story}
                                alt="Conception et développement web chez ArisTech"
                                width={900}
                                height={600}
                                loading="lazy"
                                className="aspect-[4/3] h-auto w-full object-cover"
                            />
                        </div>
                    </Reveal>

                    <div className="flex flex-col gap-6 lg:col-span-7">
                        {aristechApproachPillars.map((pillar, index) => {
                            const Icon = pillar.icon;

                            return (
                                <Reveal key={pillar.title} delay={index * 100}>
                                    <article className="group flex gap-6 rounded-2xl border border-aristech-border bg-white p-6 shadow-sm shadow-slate-900/5 transition-colors duration-300 hover:border-aristech-accent/30 md:p-8">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-aristech-accent/15 bg-aristech-accent/10 transition-colors group-hover:bg-aristech-accent/20">
                                            <Icon
                                                className="size-5 text-aristech-accent"
                                                strokeWidth={1.8}
                                                aria-hidden
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-xl font-semibold text-aristech-heading">
                                                {pillar.title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-aristech-text md:text-base">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </article>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
