import { Check } from 'lucide-react';
import { superSecuriteWhyUsModern } from '@/data/super-securite-content';
import Reveal from '@/components/marketing/reveal';

export default function WhyUsModernSection() {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal delay={80} className="mx-auto max-w-3xl">
                    <p className="marketing-label mb-3">Innovation</p>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-super-securite-heading sm:text-3xl">
                        {superSecuriteWhyUsModern.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed md:text-base">
                        {superSecuriteWhyUsModern.intro}
                    </p>
                    <p className="mt-6 text-sm font-medium text-super-securite-heading md:text-base">
                        {superSecuriteWhyUsModern.appLead}
                    </p>
                    <ul className="mt-4 space-y-3">
                        {superSecuriteWhyUsModern.appFeatures.map((feature) => (
                            <li
                                key={feature}
                                className="flex gap-3 text-sm leading-relaxed md:text-base"
                            >
                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-super-securite-accent/10">
                                    <Check
                                        className="size-3 text-super-securite-accent"
                                        strokeWidth={2.5}
                                        aria-hidden
                                    />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 text-sm leading-relaxed font-medium text-super-securite-heading md:text-base">
                        {superSecuriteWhyUsModern.conclusion}
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
