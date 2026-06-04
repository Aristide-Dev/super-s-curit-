import { usePage } from '@inertiajs/react';
import { aristechImages } from '@/data/aristech-images';
import { superSecuriteFooterServices } from '@/data/super-securite-content';
import type { AristechConfig } from '@/types/aristech';
import { FacebookIcon, TwitterIcon, Youtube } from 'lucide-react';

type SharedPageProps = {
    aristech: AristechConfig;
};

export default function MarketingFooter() {
    const { aristech } = usePage<SharedPageProps>().props;
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-aristech-border bg-aristech-surface-elevated py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div>
                        <img
                            src={aristechImages.brand}
                            alt="Super Sécurité"
                            className="h-12 w-auto max-w-[220px] object-contain object-left"
                            width={220}
                            height={48}
                        />
                        <p className="mt-4 text-sm text-aristech-muted">
                            {year} — SuperSécurité — Tous droits réservés.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm font-semibold text-aristech-heading">
                            Qui sommes-nous
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <a
                                    href="/a-propos"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Pourquoi nous choisir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#services"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Gardiennage &amp; sécurité
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#services"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Technologie
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#evenementiel"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Événementiel
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm font-semibold text-aristech-heading">
                            Services
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {superSecuriteFooterServices.map((service) => (
                                <li key={service}>{service}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm font-semibold text-aristech-heading">
                            Nous contacter
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <a
                                    href={aristech.phone_href}
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    {aristech.phone}
                                    {aristech.phone_secondary
                                        ? ` // ${aristech.phone_secondary}`
                                        : ''}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${aristech.email}`}
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    {aristech.email}
                                </a>
                            </li>
                            <li className="text-aristech-muted">
                                {aristech.address}
                            </li>
                        </ul>

                        <h3 className="mt-8 font-heading text-sm font-semibold text-aristech-heading">
                            Réseaux
                        </h3>
                        <ul className="mt-4 flex flex-col gap-2">
                            {aristech.social.facebook && (
                                <li>
                                    <a
                                        href={aristech.social.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex cursor-pointer items-center gap-2 text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                    >
                                        <FacebookIcon className="h-4 w-4 text-blue-500" />
                                        Facebook
                                    </a>
                                </li>
                            )}
                            {aristech.social.twitter && (
                                <li>
                                    <a
                                        href={aristech.social.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex cursor-pointer items-center gap-2 text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                    >
                                        <TwitterIcon className="h-4 w-4 text-blue-500" />
                                        Twitter
                                    </a>
                                </li>
                            )}
                            {aristech.social.youtube && (
                                <li>
                                    <a
                                        href={aristech.social.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex cursor-pointer items-center gap-2 text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                    >
                                        <Youtube className="h-4 w-4 text-red-600" />
                                        Youtube
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-wrap gap-4 border-t border-aristech-border pt-8 text-xs text-aristech-muted">
                    <a
                        href="/politique-de-confidentialite"
                        className="hover:text-aristech-heading"
                    >
                        Conditions générales et confidentialité
                    </a>
                    <a
                        href="/mentions-legales"
                        className="hover:text-aristech-heading"
                    >
                        Mentions légales
                    </a>
                </div>
            </div>
        </footer>
    );
}
