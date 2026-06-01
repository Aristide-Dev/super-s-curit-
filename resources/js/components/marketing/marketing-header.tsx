import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Phone } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import MarketingMobileNav from '@/components/marketing/marketing-mobile-nav';
import { aristechImages } from '@/data/aristech-images';
import { aristechServiceNavLinks } from '@/data/aristech-nav';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { about, contact, home } from '@/routes';
import type { AristechConfig } from '@/types/aristech';
import type { User } from '@/types/auth';
import { cn } from '@/lib/utils';

type SharedPageProps = {
    auth: { user: User | null };
    aristech: AristechConfig;
};

const primaryNavLinks = [
    { href: home.url(), label: 'Accueil' },
    { href: about.url(), label: 'À propos' },
    { href: contact.url(), label: 'Contact' },
] as const;

function isServicePath(pathname: string): boolean {
    return aristechServiceNavLinks.some((service) => pathname === service.href);
}

export default function MarketingHeader() {
    const { props, url } = usePage<SharedPageProps>();
    const { aristech } = props;
    const progress = useScrollProgress();
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const servicesRef = useRef<HTMLLIElement>(null);
    const pathname = url.split('?')[0] ?? '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                servicesRef.current &&
                !servicesRef.current.contains(event.target as Node)
            ) {
                setServicesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
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
                        alt="ArisTech"
                        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0 sm:h-10"
                        width={120}
                        height={40}
                    />
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    <li>
                        <Link
                            href={home.url()}
                            className="group relative cursor-pointer text-sm font-medium text-aristech-muted transition-colors duration-200 hover:text-aristech-heading"
                        >
                            Accueil
                            <span
                                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-aristech-accent transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                                aria-hidden
                            />
                        </Link>
                    </li>

                    <li ref={servicesRef} className="relative">
                        <button
                            type="button"
                            aria-expanded={servicesOpen}
                            aria-haspopup="true"
                            onClick={() => setServicesOpen((open) => !open)}
                            className={cn(
                                'group relative inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors duration-200 hover:text-aristech-heading',
                                isServicePath(pathname)
                                    ? 'text-aristech-heading'
                                    : 'text-aristech-muted',
                            )}
                        >
                            Services
                            <ChevronDown
                                className={cn(
                                    'size-4 transition-transform duration-200',
                                    servicesOpen && 'rotate-180',
                                )}
                                aria-hidden
                            />
                            <span
                                className={cn(
                                    'absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-aristech-accent transition-transform duration-300 ease-out motion-reduce:transition-none',
                                    isServicePath(pathname) || servicesOpen
                                        ? 'scale-x-100'
                                        : 'scale-x-0 group-hover:scale-x-100',
                                )}
                                aria-hidden
                            />
                        </button>

                        {servicesOpen && (
                            <div className="absolute top-full left-1/2 z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-aristech-border bg-aristech-surface p-2 shadow-xl shadow-slate-900/10">
                                <ul role="menu">
                                    {aristechServiceNavLinks.map((service) => (
                                        <li key={service.href} role="none">
                                            <Link
                                                href={service.href}
                                                role="menuitem"
                                                onClick={() =>
                                                    setServicesOpen(false)
                                                }
                                                className="block rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-aristech-surface-elevated"
                                            >
                                                <span className="block font-heading text-sm font-semibold text-aristech-heading">
                                                    {service.label}
                                                </span>
                                                <span className="mt-0.5 block text-xs text-aristech-muted">
                                                    {service.description}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>

                    {primaryNavLinks.slice(1).map((item) => (
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
                        pathname={pathname}
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
