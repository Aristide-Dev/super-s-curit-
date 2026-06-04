import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import SeoHead from '@/components/marketing/seo-head';
import CtaBand from '@/components/marketing/cta-band';
import PageHero from '@/components/marketing/page-hero';
import Reveal from '@/components/marketing/reveal';

export type CaseStudy = {
    slug: string;
    path: string;
    title: string;
    category: string;
    image: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string[];
    external_url: string | null;
};

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
    return (
        <>
            <SeoHead />

            <PageHero
                label={study.category}
                title={study.title}
                description={study.summary}
                media={
                    <div className="relative overflow-hidden rounded-3xl border border-aristech-border shadow-xl">
                        <img
                            src={study.image}
                            alt={study.title}
                            width={1200}
                            height={900}
                            className="aspect-[4/3] w-full object-cover"
                            fetchPriority="high"
                        />
                    </div>
                }
            />

            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-aristech-heading">
                                Contexte & enjeu
                            </h2>
                            <p className="mt-4 leading-relaxed text-aristech-muted">
                                {study.challenge}
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={120}>
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-aristech-heading">
                                Solution ArisTech
                            </h2>
                            <p className="mt-4 leading-relaxed text-aristech-muted">
                                {study.solution}
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={240}>
                        <div>
                            <h2 className="font-heading text-2xl font-bold text-aristech-heading">
                                Résultats
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {study.results.map((result) => (
                                    <li
                                        key={result}
                                        className="flex gap-3 text-sm leading-relaxed text-aristech-muted"
                                    >
                                        <span
                                            className="mt-1.5 size-2 shrink-0 rounded-full bg-aristech-accent"
                                            aria-hidden
                                        />
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                    {study.external_url && (
                        <Reveal delay={360}>
                            <a
                                href={study.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-semibold text-aristech-accent"
                            >
                                Visiter le projet en ligne
                                <ArrowUpRight className="size-4" aria-hidden />
                            </a>
                        </Reveal>
                    )}
                    <p>
                        <Link
                            href="/realisations"
                            className="text-sm font-medium text-aristech-muted hover:text-aristech-heading"
                        >
                            ← Toutes les réalisations
                        </Link>
                    </p>
                </div>
            </section>

            <CtaBand />
        </>
    );
}
