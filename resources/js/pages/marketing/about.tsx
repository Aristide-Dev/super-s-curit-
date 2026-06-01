import SeoHead from '@/components/marketing/seo-head';
import CtaBand from '@/components/marketing/cta-band';
import FounderSection from '@/components/marketing/founder-section';
import PageHero from '@/components/marketing/page-hero';
import AboutApproachSection from '@/components/marketing/about-approach-section';
import ValuesSection from '@/components/marketing/values-section';
import { aristechImages } from '@/data/aristech-images';

export default function MarketingAbout() {
    return (
        <>
            <SeoHead page="about" />

            <PageHero
                label="Qui sommes-nous"
                title={
                    <>
                        Des standards internationaux,{' '}
                        <span className="marketing-text-gradient">
                            au service de vos projets
                        </span>
                    </>
                }
                description="ArisTech conçoit et déploie des sites internet, applications web et outils métiers selon les bonnes pratiques du marché : performance, accessibilité, sécurité et code maintenable. Écoute, livrables clairs et exigence technique — pour une présence en ligne fiable, où que vous exerciez."
                media={
                    <div className="relative mx-auto w-full max-w-lg">
                        <div
                            className="absolute -inset-4 rounded-3xl bg-transparent"
                            aria-hidden
                        />
                        <div className="relative overflow-hidden rounded-3xl bg-transparent">
                            <img
                                src={aristechImages.brand}
                                alt="ArisTech — agence web et développement sur mesure"
                                width={1200}
                                height={900}
                                className="aspect-[4/4] h-auto w-full object-cover"
                                fetchPriority="high"
                            />
                            <div
                                className="pointer-events-none absolute inset-0 bg-transparent"
                                aria-hidden
                            />
                        </div>
                    </div>
                }
            >
            </PageHero>

            <AboutApproachSection />
            <ValuesSection />
            <FounderSection />
            <CtaBand />
        </>
    );
}
