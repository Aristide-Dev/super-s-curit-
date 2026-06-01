import { aristechServicePages } from '@/data/aristech-service-pages';
import ServicePage from '@/pages/marketing/service-page';

export default function ReferencementSeoPage() {
    return <ServicePage content={aristechServicePages.seo} />;
}
