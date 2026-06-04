import { superSecuriteServices } from '@/data/super-securite-content';
import Reveal from '@/components/marketing/reveal';

export default function ServiceCards() {
    return (
        <section id="services" className="py-10 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mb-14 max-w-2xl">
                    <p className="marketing-label mb-3">Services</p>
                    <h2 className="marketing-heading-section">
                        Nos offres de service de{' '}
                        <span className="marketing-text-gradient">
                            sécurité
                        </span>
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {superSecuriteServices.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <Reveal
                                key={service.id}
                                delay={index * 120}
                                className="h-full"
                            >
                                <article
                                    id={service.id}
                                    className="marketing-card-interactive flex h-full flex-col p-6 md:p-8"
                                >
                                    <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl border border-aristech-accent/20 bg-aristech-accent/10">
                                        <Icon
                                            className="size-6 text-aristech-accent"
                                            strokeWidth={1.8}
                                            aria-hidden
                                        />
                                    </div>
                                    <h3 className="font-heading text-xl font-semibold text-aristech-heading">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
