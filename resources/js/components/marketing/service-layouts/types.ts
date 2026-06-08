import type { ServicePageContent } from '@/data/super-securite-service-pages';

export type ServicePageLayoutProps = {
    content: ServicePageContent;
    faqs: readonly { question: string; answer: string }[];
};
