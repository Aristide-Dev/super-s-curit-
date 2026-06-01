export const aristechProjectTypes = [
    'Site vitrine / institutionnel',
    'Application web sur mesure',
    'Boutique en ligne (e-commerce)',
    'Intégrateur de solutions / API',
    'Application mobile',
    'Référencement SEO',
    'Autre',
] as const;

export type AristechFaq = {
    question: string;
    answer: string;
};

export const aristechFaqs: readonly AristechFaq[] = [
    {
        question: 'Combien coûte la création d\'un site internet en Guinée ?',
        answer:
            'Le prix dépend du type de projet : site internet sur mesure, boutique en ligne, application web ou intégration de solutions. Après analyse de votre besoin, nous envoyons un devis forfaitaire détaillé (design, développement, SEO de base et mise en ligne).',
    },
    {
        question: 'Sous combien de temps répondez-vous ?',
        answer:
            'Nous répondons à toutes les demandes sous 24 heures ouvrées. Pour les projets urgents, mentionnez-le dans votre message et nous priorisons votre dossier.',
    },
    {
        question: 'Travaillez-vous avec des clients hors Guinée ?',
        answer:
            "Oui. Nous accompagnons régulièrement des clients en Afrique de l'Ouest, en Europe et en Amérique du Nord. Tout se passe à distance avec des points hebdomadaires.",
    },
    {
        question: 'Quelle est la durée moyenne d\u2019un projet ?',
        answer:
            'Un site vitrine se livre en 2 à 4 semaines. Une application web sur mesure prend généralement 6 à 12 semaines selon la complexité. Nous communiquons un planning précis dès le cadrage.',
    },
    {
        question: 'Comment se passe la facturation ?',
        answer:
            'Nous facturons au forfait pour les projets bien cadrés, ou en régie (TJM) pour les missions évolutives. Un acompte de 30 % est demandé au lancement.',
    },
    {
        question: 'Proposez-vous de la maintenance après livraison ?',
        answer:
            'Oui. Nous offrons des contrats de support et de maintenance (correctifs, mises à jour, monitoring) avec différents niveaux de service selon vos besoins.',
    },
] as const;
