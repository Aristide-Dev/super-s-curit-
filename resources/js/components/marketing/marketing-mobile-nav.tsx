import { Link } from '@inertiajs/react';
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react';
import { aristechImages } from '@/data/aristech-images';
import { superSecuriteNavLinks } from '@/data/aristech-nav';
import { about, contact, home } from '@/routes';
import type { AristechConfig } from '@/types/aristech';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

type MarketingMobileNavProps = {
    aristech: AristechConfig;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const primaryLinks = [
    { href: home.url(), label: 'Accueil' },
    { href: about.url(), label: 'Pourquoi nous' },
    { href: contact.url(), label: 'Nous contacter' },
] as const;

export default function MarketingMobileNav({
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
                            alt="Super Sécurité"
                            className="h-10 w-auto max-w-[180px] object-contain object-left"
                            width={180}
                            height={40}
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
                                    className="flex items-center justify-between rounded-2xl border border-aristech-border bg-aristech-surface px-4 py-3.5 font-heading text-base font-semibold text-aristech-heading transition-colors duration-200 hover:border-aristech-accent/30"
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
                    <ul className="space-y-2">
                        {superSecuriteNavLinks.map((service) => (
                            <li key={service.href}>
                                <a
                                    href={service.href}
                                    onClick={close}
                                    className="block rounded-2xl border border-aristech-border bg-aristech-surface px-4 py-3 font-heading text-sm font-semibold text-aristech-heading transition-colors hover:border-aristech-accent/30"
                                >
                                    {service.label}
                                </a>
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
                        {aristech.phone}
                    </a>
                    <a
                        href={`mailto:${aristech.email}`}
                        className="marketing-cta-secondary flex w-full items-center justify-center gap-2"
                    >
                        <Mail className="size-4" aria-hidden />
                        {aristech.email}
                    </a>
                    <p className="text-center text-xs text-aristech-muted">
                        {aristech.address}
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
