import type { SuperSecuriteServiceId } from '@/data/super-securite-services';
import ServiceLayoutChantiers from '@/components/marketing/service-layouts/service-layout-chantiers';
import ServiceLayoutEntreprise from '@/components/marketing/service-layouts/service-layout-entreprise';
import ServiceLayoutResidence from '@/components/marketing/service-layouts/service-layout-residence';
import ServiceLayoutZonesMinieres from '@/components/marketing/service-layouts/service-layout-zones-minieres';
import type { ServicePageLayoutProps } from '@/components/marketing/service-layouts/types';
import type { ComponentType } from 'react';

export const servicePageLayouts: Record<
    SuperSecuriteServiceId,
    ComponentType<ServicePageLayoutProps>
> = {
    entreprise: ServiceLayoutEntreprise,
    residence: ServiceLayoutResidence,
    chantiers: ServiceLayoutChantiers,
    'zones-minieres': ServiceLayoutZonesMinieres,
};
