import { superSecuriteAdvantages } from '@/data/super-securite-content';
import { superSecuriteStock } from '@/data/super-securite-stock';
import {
    superSecuriteHoursLong,
    superSecuriteHoursShort,
} from '@/data/super-securite-hours';
import { superSecuriteZoneLabel } from '@/data/super-securite-zone';
import Reveal from '@/components/marketing/reveal';

const whyUsStats = [
    { label: 'Disponibilité', value: superSecuriteHoursShort },
    { label: 'Zone', value: superSecuriteZoneLabel },
    { label: 'Expertise', value: 'Sécurité privée' },
] as const;

export default function WhyUsSection() {
    return (
        <section
            id="pourquoi"
            className="marketing-hero-cinematic relative overflow-hidden"
        >
            <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1920px] items-end overflow-hidden lg:items-center">
                <img
                    src={superSecuriteStock.home.whyUsBannerTransparent}
                    alt="Super Sécurité — équipes et sites sécurisés"
                    width={1920}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full max-w-full object-cover"
                />

                <div
                    className="marketing-hero-overlay-side pointer-events-none absolute inset-0"
                    aria-hidden
                />
                <div
                    className="marketing-hero-overlay-base pointer-events-none absolute inset-0"
                    aria-hidden
                />
                <div
                    className="absolute inset-y-0 left-0 w-1 bg-super-securite-accent sm:w-1.5"
                    aria-hidden
                />

                <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-4 pt-28 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:py-28">
                    <div className="max-w-2xl min-w-0">
                        <Reveal delay={80}>
                            <p className="marketing-label mb-3 flex items-center gap-2 text-white/80 before:block before:h-px before:w-6 before:bg-super-securite-accent">
                                Pourquoi
                            </p>
                        </Reveal>

                        <Reveal delay={120}>
                            <h2 className="font-heading text-3xl leading-[1.05] font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                                Choisir Super{' '}
                                <span className="relative inline-block text-super-securite-accent">
                                    SÉCURITÉ
                                    <svg
                                        viewBox="0 0 380 22"
                                        className="marketing-underline-draw absolute -bottom-3 left-0 w-full sm:-bottom-4"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        aria-hidden
                                    >
                                        <path
                                            d="M2 16 C 100 1, 280 1, 378 16"
                                            stroke="url(#why-us-underline)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="why-us-underline"
                                                x1="0"
                                                y1="0"
                                                x2="1"
                                                y2="0"
                                            >
                                                <stop
                                                    offset="0"
                                                    stopColor="var(--super-securite-accent)"
                                                />
                                                <stop
                                                    offset="1"
                                                    stopColor="#ffffff"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                ?
                            </h2>
                        </Reveal>

                        <Reveal delay={260} className="mt-5 max-w-xl sm:mt-6">
                            <p className="text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                                Une équipe expérimentée, réactive et disponible{' '}
                                {superSecuriteHoursLong} pour sécuriser vos
                                entreprises, résidences, chantiers et zones
                                sensibles à {superSecuriteZoneLabel}.
                            </p>
                        </Reveal>

                        <Reveal
                            as="dl"
                            delay={400}
                            className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:mt-10 sm:max-w-none sm:grid-cols-3 sm:gap-4"
                        >
                            {whyUsStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="min-w-0 rounded-xl border border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
                                >
                                    <dt className="text-[10px] text-white/65 sm:text-xs">
                                        {stat.label}
                                    </dt>
                                    <dd className="mt-1 font-heading text-xs font-semibold break-words text-white sm:text-sm">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </div>

            <div className="bg-white py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Reveal delay={80} className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                        <p className="marketing-label mb-2">Nos atouts</p>
                        <h3 className="font-heading text-2xl font-bold tracking-tight text-super-securite-heading sm:text-3xl">
                            Ce qui nous distingue
                        </h3>
                    </Reveal>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {superSecuriteAdvantages.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <Reveal key={item.title} delay={index * 100}>
                                    <article className="marketing-card-interactive flex h-full flex-col p-6 text-center md:p-8">
                                        <div className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full border border-super-securite-accent/20 bg-super-securite-accent/10">
                                            <Icon
                                                className="size-6 text-super-securite-accent"
                                                strokeWidth={1.8}
                                                aria-hidden
                                            />
                                        </div>
                                        <h3 className="font-heading text-lg font-semibold text-super-securite-heading">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 flex-1 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
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
