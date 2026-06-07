import { contact, home } from '@/routes';

export type MarketingErrorStatus = 403 | 404 | 500 | 503;

export type MarketingErrorIcon = 'not-found' | 'forbidden' | 'server' | 'maintenance';

export type MarketingErrorPageConfig = {
    status: MarketingErrorStatus;
    icon: MarketingErrorIcon;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    hint?: string;
};

export const marketingErrorPages: Record<
    MarketingErrorStatus,
    MarketingErrorPageConfig
> = {
    404: {
        status: 404,
        icon: 'not-found',
        title: 'Page introuvable',
        description:
            'L\'adresse saisie est incorrecte ou la page a été déplacée. Vérifiez l\'URL ou revenez à l\'accueil.',
        primaryCta: { label: 'Retour à l\'accueil', href: home.url() },
        secondaryCta: { label: 'Nous contacter', href: contact.url() },
        hint: 'Erreur 404 — ressource non disponible',
    },
    403: {
        status: 403,
        icon: 'forbidden',
        title: 'Accès refusé',
        description:
            'Vous n\'avez pas les droits nécessaires pour consulter cette page. Connectez-vous avec un compte autorisé ou revenez à l\'accueil.',
        primaryCta: { label: 'Retour à l\'accueil', href: home.url() },
        secondaryCta: { label: 'Nous contacter', href: contact.url() },
        hint: 'Erreur 403 — accès restreint',
    },
    500: {
        status: 500,
        icon: 'server',
        title: 'Erreur serveur',
        description:
            'Un problème technique temporaire empêche l\'affichage de cette page. Réessayez dans quelques instants.',
        primaryCta: { label: 'Retour à l\'accueil', href: home.url() },
        secondaryCta: { label: 'Nous contacter', href: contact.url() },
        hint: 'Erreur 500 — incident signalé à nos équipes',
    },
    503: {
        status: 503,
        icon: 'maintenance',
        title: 'Site en maintenance',
        description:
            'Super Sécurité met à jour son site. Le service sera rétabli très prochainement.',
        primaryCta: { label: 'Retour à l\'accueil', href: home.url() },
        secondaryCta: { label: 'Nous contacter', href: contact.url() },
        hint: 'Erreur 503 — maintenance en cours',
    },
};
