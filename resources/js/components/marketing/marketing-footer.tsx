import { usePage } from '@inertiajs/react';
import { aristechImages } from '@/data/aristech-images';
import type { AristechConfig } from '@/types/aristech';
import { FacebookIcon, GithubIcon, InstagramIcon } from 'lucide-react';
import { TwitterIcon } from 'lucide-react';

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
                            alt="ArisTech"
                            className="h-12 w-auto"
                            width={80}
                            height={48}
                        />
                        <p className="mt-4 text-sm text-aristech-muted">
                            © {year} ArisTech. Tous droits réservés.
                        </p>
                        {aristech.rccm && (
                            <p className="mt-2 text-xs text-aristech-muted">
                                RCCM : {aristech.rccm}
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className="font-heading text-sm font-semibold text-aristech-heading">
                            Site
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <a
                                    href="/realisations"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Réalisations
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/politique-de-confidentialite"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Confidentialité
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/mentions-legales"
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    Mentions légales
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm font-semibold text-aristech-heading">
                            Contact
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <a
                                    href={`mailto:${aristech.email}`}
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    {aristech.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={aristech.phone_href}
                                    className="cursor-pointer transition-colors duration-200 hover:text-aristech-heading"
                                >
                                    {aristech.phone}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-sm font-semibold text-aristech-heading">
                            Réseaux
                        </h3>
                        {(aristech.social.facebook ||
                            aristech.social.twitter ||
                            aristech.social.instagram ||
                            aristech.social.linkedin ||
                            aristech.social.github) && (
                            <ul className="mt-4 flex flex-col gap-2">
                                {aristech.social.facebook && (
                                    <li>
                                        <a
                                            href={aristech.social.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 cursor-pointer text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                        >
                                            <FacebookIcon className="h-4 w-4 text-blue-500" />
                                            <span>Facebook</span>
                                        </a>
                                    </li>
                                )}
                                {aristech.social.twitter && (
                                    <li>
                                        <a
                                            href={aristech.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 cursor-pointer text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                        >
                                            <TwitterIcon className="h-4 w-4 text-blue-500" />
                                            <span>Twitter</span>
                                        </a>
                                    </li>
                                )}
                                {aristech.social.instagram && (
                                    <li>
                                        <a
                                            href={aristech.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 cursor-pointer text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                        >
                                            <InstagramIcon className="h-4 w-4 text-red-500" />
                                            <span>Instagram</span>
                                        </a>
                                    </li>
                                )}
                                {aristech.social.linkedin && (
                                    <li>
                                        <a
                                            href={aristech.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-pointer text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                )}
                                {aristech.social.github && (
                                    <li>
                                        <a
                                            href={aristech.social.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 cursor-pointer text-sm text-aristech-muted transition-colors duration-200 hover:text-aristech-accent"
                                        >
                                            <GithubIcon className="h-4 w-4" />
                                            <span>Aristech-Dev</span>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
