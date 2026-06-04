import SeoHead from '@/components/marketing/seo-head';
import PageHero from '@/components/marketing/page-hero';
import Reveal from '@/components/marketing/reveal';

const sections = [
    {
        title: 'Responsable du traitement',
        body: 'ArisTech (ARISTECH), Kaporo Ratoma — Conakry, Guinée. Contact : contact@aristechguinee.com.',
    },
    {
        title: 'Données collectées',
        body: 'Via le formulaire de contact : nom, e-mail, téléphone et contenu du message. Données de navigation anonymisées pour les statistiques du site (pages vues, durée, appareil).',
    },
    {
        title: 'Finalités',
        body: 'Répondre à vos demandes de devis, améliorer le site et mesurer l’audience de manière agrégée. Nous ne vendons pas vos données.',
    },
    {
        title: 'Cookies',
        body: 'Cookies techniques (session, préférences) et cookie visiteur pour les statistiques internes. Vous pouvez les refuser via les paramètres de votre navigateur.',
    },
    {
        title: 'Durée de conservation',
        body: 'Messages de contact : 24 mois maximum sauf obligation légale. Données analytics : agrégées et conservées selon notre politique interne.',
    },
    {
        title: 'Vos droits',
        body: 'Accès, rectification ou suppression de vos données sur simple demande à contact@aristechguinee.com.',
    },
] as const;

export default function PrivacyPage() {
    return (
        <>
            <SeoHead />

            <PageHero
                label="Légal"
                title="Politique de confidentialité"
                description="Transparence sur la collecte et l'utilisation de vos données personnelles."
                align="center"
            />

            <section className="pb-24">
                <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
                    {sections.map((section, index) => (
                        <Reveal key={section.title} delay={index * 60}>
                            <article>
                                <h2 className="font-heading text-xl font-semibold text-aristech-heading">
                                    {section.title}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-aristech-muted">
                                    {section.body}
                                </p>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    );
}
