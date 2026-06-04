import { superSecuriteAdvantages } from '@/data/super-securite-content';
import Reveal from '@/components/marketing/reveal';

export default function WhyUsSection() {
    return (
        <section id="pourquoi" className="marketing-grid-bg py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mb-14 max-w-2xl text-center mx-auto">
                    <p className="marketing-label mb-3">Pourquoi</p>
                    <h2 className="marketing-heading-section">
                        Choisir Super{' '}
                        <span className="marketing-text-gradient">SÉCURITÉ</span>{' '}
                        ?
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {superSecuriteAdvantages.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <Reveal key={item.title} delay={index * 100}>
                                <article className="marketing-card-interactive flex h-full flex-col p-6 text-center md:p-8">
                                    <div className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full border border-aristech-accent/20 bg-aristech-accent/10">
                                        <Icon
                                            className="size-6 text-aristech-accent"
                                            strokeWidth={1.8}
                                            aria-hidden
                                        />
                                    </div>
                                    <h3 className="font-heading text-lg font-semibold text-aristech-heading">
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
        </section>
    );
}
