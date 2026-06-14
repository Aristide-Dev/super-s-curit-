import { superSecuritePartners } from '@/data/super-securite-partners';

export default function PartnersMarquee() {
    const items = [...superSecuritePartners, ...superSecuritePartners];

    return (
        <section
            className="border-b border-super-securite-border bg-white"
            aria-labelledby="partners-heading"
        >
            <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
                <h2
                    id="partners-heading"
                    className="font-heading text-lg font-semibold tracking-tight text-super-securite-heading sm:text-xl"
                >
                    Ils nous font confiance
                </h2>
            </div>

            <div
                className="marketing-marquee-paused relative overflow-hidden border-none py-6"
                aria-label="Logos des partenaires Super Sécurité"
            >

            <ul
                className="marketing-marquee flex w-max items-center gap-12 pr-12"
                style={{ '--marquee-duration': '40s' } as React.CSSProperties}
                role="list"
            >
                {items.map((partner, index) => (
                    <li
                        key={`${partner.name}-${index}`}
                        className="flex shrink-0 items-center gap-4 text-super-securite-muted"
                    >
                        <img
                            src={partner.logo}
                            alt={`Logo ${partner.name}`}
                            width={120}
                            height={60}
                            loading="lazy"
                            decoding="async"
                            className="h-10 w-auto max-w-[7rem] object-contain opacity-90 md:h-12 md:max-w-[8rem]"
                        />
                        <span className="font-heading text-sm font-medium tracking-wide whitespace-nowrap text-super-securite-heading">
                            {partner.name}
                        </span>
                    </li>
                ))}
            </ul>
            </div>
        </section>
    );
}
