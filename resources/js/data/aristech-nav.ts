import { aristechServiceDefinitions } from '@/data/aristech-services';
import {
    applicationWeb,
    creationSite,
    integrateurSolutions,
    seo,
    woocommerce,
} from '@/routes';

const serviceRoutes = {
    applicationWeb,
    creationSite,
    woocommerce,
    integrateurSolutions,
    seo,
} as const;

export const aristechServiceNavLinks = aristechServiceDefinitions.map(
    (service) => ({
        href: serviceRoutes[service.id].url(),
        label: service.navLabel,
        description: service.navTagline,
    }),
);
