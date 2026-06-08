import { usePage } from '@inertiajs/react';
import SeoHead from '@/components/marketing/seo-head';
import { servicePageLayouts } from '@/components/marketing/service-layouts';
import {
    superSecuriteServicePages,
} from '@/data/super-securite-service-pages';
import type { SuperSecuriteServiceId } from '@/data/super-securite-services';

type PageProps = {
    pageFaqs: { question: string; answer: string }[];
    serviceId: SuperSecuriteServiceId;
};

export default function ServicePage() {
    const { serviceId, pageFaqs } = usePage<PageProps>().props;
    const content = superSecuriteServicePages[serviceId];
    const Layout = servicePageLayouts[serviceId];

    return (
        <>
            <SeoHead />
            <Layout content={content} faqs={pageFaqs} />
        </>
    );
}
