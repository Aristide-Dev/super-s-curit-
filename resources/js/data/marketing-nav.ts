import { superSecuriteServiceDefinitions } from '@/data/super-securite-services';
import { index as actualitesIndex } from '@/routes/actualites';
import { index as conseilsIndex } from '@/routes/conseils-securite';
import { index as galerieIndex } from '@/routes/galerie';
import { about, contact, home } from '@/routes';

export const marketingPrimaryNavLinks = [
    { href: home.url(), label: 'Accueil' },
    { href: about.url(), label: 'Pourquoi nous' },
    { href: actualitesIndex.url(), label: 'Actualités' },
    { href: conseilsIndex.url(), label: 'Conseils' },
    { href: galerieIndex.url(), label: 'Galerie' },
    { href: contact.url(), label: 'Nous contacter' },
] as const;

export const marketingServiceNavLinks = superSecuriteServiceDefinitions.map(
    (service) => ({
        href: service.path,
        label: service.title,
        description: service.cardDescription,
    }),
) as readonly {
    href: string;
    label: string;
    description: string;
}[];
