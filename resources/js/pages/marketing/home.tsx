import SeoHead from '@/components/marketing/seo-head';
import CtaBand from '@/components/marketing/cta-band';
import LatestProjects from '@/components/marketing/latest-projects';
import MarketingHero from '@/components/marketing/marketing-hero';
import ServiceCards from '@/components/marketing/service-cards';
import TechMarquee from '@/components/marketing/tech-marquee';
import TechStack from '@/components/marketing/tech-stack';

export default function MarketingHome() {
    return (
        <>
            <SeoHead page="home" />

            <MarketingHero />
            <TechMarquee />
            <ServiceCards />
            <LatestProjects />
            <TechStack />
            <CtaBand />
        </>
    );
}
