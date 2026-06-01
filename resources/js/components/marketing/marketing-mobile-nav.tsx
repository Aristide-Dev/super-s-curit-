import { Link } from '@inertiajs/react';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
import { aristechImages } from '@/data/aristech-images';
import { aristechServiceNavLinks } from '@/data/aristech-nav';
import { about, contact, home } from '@/routes';
import type { AristechConfig } from '@/types/aristech';
import { cn } from '@/lib/utils';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

type MarketingMobileNavProps = {
    pathname: string;
    aristech: AristechConfig;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const primaryLinks = [
    { href: home.url(), label: 'Accueil' },
    { href: about.url(), label: 'À propos' },
    { href: contact.url(), label: 'Contact' },
] as const;

function isActive(pathname: string, href: string): boolean {
    return pathname === href;
}

export default function MarketingMobileNav({
    pathname,
    aristech,
    open,
    onOpenChange,
}: MarketingMobileNavProps) {
    const close = () => onOpenChange(false);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <button
                    type="button"
                    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-aristech-border bg-aristech-surface/90 text-aristech-heading shadow-sm transition-colors duration-200 hover:border-aristech-accent/40 hover:bg-aristech-surface md:hidden"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="size-5" aria-hidden />
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="z-[60] flex h-full w-full max-w-none flex-col gap-0 border-aristech-border bg-aristech-bg p-0 sm:max-w-md [&>button]:hidden"
            >
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>

                <div className="marketing-grid-bg relative flex shrink-0 items-center justify-between border-b border-aristech-border px-5 py-4">
                    <Link
                        href={home.url()}
                        onClick={close}
                        className="flex items-center"
                    >
                        <img
                            src={aristechImages.brand}
                            alt="ArisTech"
                            className="h-9 w-auto"
                            width={108}
                            height={36}
                        />
                    </Link>
                    <SheetClose asChild>
                        <button
                            type="button"
                            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-aristech-border bg-aristech-surface text-aristech-heading transition-colors hover:border-aristech-accent/40"
                            aria-label="Fermer le menu"
                        >
                            <X className="size-5" aria-hidden />
                        </button>
                    </SheetClose>
                </div>

                <nav
                    className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-6"
                    aria-label="Navigation mobile"
                >
                    <p className="marketing-label mb-3">Navigation</p>
                    <ul className="space-y-2">
                        {primaryLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={close}
                                    className={cn(
                                        'flex items-center justify-between rounded-2xl border px-4 py-3.5 font-heading text-base font-semibold transition-colors duration-200',
                                        isActive(pathname, item.href)
                                            ? 'border-aristech-accent/30 bg-aristech-accent/10 text-aristech-accent'
                                            : 'border-aristech-border bg-aristech-surface text-aristech-heading hover:border-aristech-accent/30',
                                    )}
                                >
                                    {item.label}
                                    <ArrowRight
                                        className="size-4 opacity-50"
                                        aria-hidden
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="marketing-label mt-8 mb-3">Services</p>
                    <ul className="space-y-3">
                        {aristechServiceNavLinks.map((service, index) => (
                            <li key={service.href}>
                                <Link
                                    href={service.href}
                                    onClick={close}
                                    className={cn(
                                        'group block rounded-2xl border p-4 transition-all duration-200',
                                        isActive(pathname, service.href)
                                            ? 'border-aristech-accent/40 bg-aristech-accent/10'
                                            : 'border-aristech-border bg-aristech-surface hover:border-aristech-accent/30 hover:shadow-md hover:shadow-slate-900/5',
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <span className="font-heading text-xs font-bold text-aristech-accent">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                            <p className="mt-1 font-heading text-sm font-semibold text-aristech-heading">
                                                {service.label}
                                            </p>
                                            <p className="mt-1 text-xs leading-relaxed text-aristech-muted">
                                                {service.description}
                                            </p>
                                        </div>
                                        <ArrowRight
                                            className="mt-1 size-4 shrink-0 text-aristech-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-aristech-accent"
                                            aria-hidden
                                        />
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="shrink-0 space-y-3 border-t border-aristech-border bg-aristech-surface/80 p-5 backdrop-blur-sm">
                    <a
                        href={aristech.phone_href}
                        className="marketing-cta-primary flex w-full items-center justify-center gap-2"
                    >
                        <Phone className="size-4" aria-hidden />
                        Appelez-nous
                    </a>
                    <a
                        href={`mailto:${aristech.email}`}
                        className="marketing-cta-secondary flex w-full items-center justify-center gap-2"
                    >
                        <Mail className="size-4" aria-hidden />
                        {aristech.email}
                    </a>
                    <p className="text-center text-xs text-aristech-muted">
                        Conakry, Guinée · Lun – Ven, 9h – 18h
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
