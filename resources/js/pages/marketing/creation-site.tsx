import { aristechServicePages } from '@/data/aristech-service-pages';
import ServicePage from '@/pages/marketing/service-page';

export default function CreationSitePage() {
    return <ServicePage content={aristechServicePages.creationSite} />;
}
