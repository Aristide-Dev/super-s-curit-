import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { superSecuriteWelcome } from '@/data/super-securite-content';
import Reveal from '@/components/marketing/reveal';
import { about } from '@/routes';

export default function WelcomeSection() {
    return (
        <section id="bienvenue" className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <Reveal>
                        <p className="marketing-label mb-3">Super SÉCURITÉ</p>
                        <h2 className="marketing-heading-section">
                            {superSecuriteWelcome.title}
                        </h2>
                        {superSecuriteWelcome.paragraphs.map((paragraph) => (
                            <p
                                key={paragraph.slice(0, 40)}
                                className="mt-4 text-sm leading-relaxed md:text-base"
                            >
                                {paragraph}
                            </p>
                        ))}
                        <Link
                            href={about.url()}
                            className="marketing-cta-secondary marketing-magnetic mt-8 inline-flex items-center gap-2"
                        >
                            Découvrez
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </Reveal>
                    <Reveal delay={200} variant="fade">
                        <div className="relative overflow-hidden rounded-3xl border border-aristech-border bg-aristech-surface p-8 shadow-lg shadow-slate-900/10 md:p-12">
                            <p className="font-heading text-5xl font-bold tracking-tight text-aristech-accent md:text-6xl">
                                24/7
                            </p>
                            <p className="mt-4 font-heading text-xl font-semibold text-aristech-heading">
                                Protection continue
                            </p>
                            <p className="mt-3 text-sm leading-relaxed">
                                Une équipe d&apos;experts en sécurité privée,
                                mobilisable à tout moment pour vos sites,
                                événements et résidences.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
