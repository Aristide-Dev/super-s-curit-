export type VideoItem = {
    id: number;
    src: string;
    title: string;
    description: string;
    serviceId: 'entreprise' | 'residence' | 'chantiers' | 'zones-minieres' | 'general';
};

export const superSecuriteVideos: VideoItem[] = [
    {
        id: 1,
        src: '/images/super-securite/video-formation-incendie-1.mp4',
        title: 'Formation Incendie - Partie 1',
        description: 'Apprentissage des techniques d\'extinction de départ de feu.',
        serviceId: 'general',
    },
    {
        id: 2,
        src: '/images/super-securite/video-formation-incendie-2.mp4',
        title: 'Formation Incendie - Partie 2',
        description: 'Exercice pratique d\'extinction avec manipulation d\'extincteur.',
        serviceId: 'general',
    },
    {
        id: 3,
        src: '/images/super-securite/video-exercice-incendie-3.mp4',
        title: 'Exercice d\'Extinction Pratique',
        description: 'Entraînement des agents à l\'extinction rapide de feux réels.',
        serviceId: 'general',
    },
    {
        id: 4,
        src: '/images/super-securite/video-exercice-incendie-4.mp4',
        title: 'Simulation de Lutte contre le Feu',
        description: 'Maîtrise du jet et gestion du dégagement de fumée.',
        serviceId: 'general',
    },
    {
        id: 5,
        src: '/images/super-securite/video-ronde-securite-1.mp4',
        title: 'Ronde de Sécurité - Patrouille',
        description: 'Ronde de surveillance nocturne autour d\'un site industriel.',
        serviceId: 'entreprise',
    },
    {
        id: 6,
        src: '/images/super-securite/video-ronde-securite-2.mp4',
        title: 'Ronde de Sécurité - Périmètre',
        description: 'Vérification des clôtures et points d\'accès par nos agents.',
        serviceId: 'entreprise',
    },
    {
        id: 7,
        src: '/images/super-securite/video-ronde-securite-3.mp4',
        title: 'Patrouille de Sécurité Active',
        description: 'Supervision en direct et ronde extérieure de périmètre.',
        serviceId: 'entreprise',
    },
    {
        id: 8,
        src: '/images/super-securite/video-marche-patrouille-1.mp4',
        title: 'Marche de Patrouille Coordonnée',
        description: 'Entraînement des agents à la marche tactique de patrouille.',
        serviceId: 'general',
    },
    {
        id: 9,
        src: '/images/super-securite/video-drill-agents-3.mp4',
        title: 'Drill et Entraînement Tactique',
        description: 'Exercices de réactivité et coordination physique pour les agents.',
        serviceId: 'general',
    },
];
