import { Link, usePage } from '@inertiajs/react';
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import MarketingMobileNav from '@/components/marketing/marketing-mobile-nav';
import { aristechImages } from '@/data/aristech-images';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { about, contact, home } from '@/routes';
import type { AristechConfig } from '@/types/aristech';
import type { User } from '@/types/auth';
import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

type SharedPageProps = {
    auth: { user: User | null };
    aristech: AristechConfig;
};

const primaryNavLinks = [
    { href: home.url(), label: 'Accueil' },
    { href: about.url(), label: 'Pourquoi nous' },
    { href: contact.url(), label: 'Nous contacter' },
] as const;

export default function MarketingHeader() {
    const { props } = usePage<SharedPageProps>();
    const { aristech } = props;
    const progress = useScrollProgress();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300',
                scrolled
                    ? 'border-b border-aristech-border bg-aristech-surface/85 shadow-md shadow-slate-900/5 backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent',
            )}
        >
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
                aria-label="Navigation principale"
            >
                <Link
                    href={home.url()}
                    className="group flex shrink-0 cursor-pointer items-center gap-2 focus-visible:ring-2 focus-visible:ring-aristech-accent focus-visible:outline-none"
                >
                    <img
                        src={aristechImages.brand}
                        alt="Super Sécurité"
                        className="h-10 w-auto max-w-[200px] object-contain object-left transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-11 sm:max-w-[240px]"
                        width={240}
                        height={48}
                    />
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    {primaryNavLinks.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className="group relative cursor-pointer text-sm font-medium text-aristech-muted transition-colors duration-200 hover:text-aristech-heading"
                            >
                                {item.label}
                                <span
                                    className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-aristech-accent transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                                    aria-hidden
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 sm:gap-3">
                    <a
                        href={aristech.phone_href}
                        className="marketing-cta-primary marketing-magnetic hidden shrink-0 items-center gap-2 text-sm whitespace-nowrap md:inline-flex"
                    >
                        <Phone className="size-4" />
                        Appelez-nous
                    </a>

                    <MarketingMobileNav
                        aristech={aristech}
                        open={mobileMenuOpen}
                        onOpenChange={setMobileMenuOpen}
                    />
                </div>
            </nav>

            <div
                className="marketing-scroll-progress"
                style={{ '--scroll-progress': progress } as CSSProperties}
                role="progressbar"
                aria-label="Progression de lecture"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
            />
        </header>
    );
}
