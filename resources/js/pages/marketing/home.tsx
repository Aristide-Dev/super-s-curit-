import SeoHead from '@/components/marketing/seo-head';
import CtaBand from '@/components/marketing/cta-band';
import MarketingHero from '@/components/marketing/marketing-hero';
import ServiceCards from '@/components/marketing/service-cards';
import TestimonialsSection from '@/components/marketing/testimonials-section';
import WelcomeSection from '@/components/marketing/welcome-section';
import WhyUsSection from '@/components/marketing/why-us-section';

export default function MarketingHome() {
    return (
        <>
            <SeoHead />

            <MarketingHero />
            <WelcomeSection />
            <ServiceCards />
            <WhyUsSection />
            <TestimonialsSection />
            <CtaBand />
        </>
    );
}
