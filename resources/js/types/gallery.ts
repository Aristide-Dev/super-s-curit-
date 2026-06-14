import type { MarketingContentImageSource } from '@/types/marketing-content';

export type GalleryImagePublic = {
    id: number;
    service_id: string | null;
    service_label: string;
    service_path: string | null;
    src: string;
    alt: string;
    caption: string | null;
    image_source?: MarketingContentImageSource | null;
    sort_order: number;
};

export type GalleryServiceOption = {
    value: string;
    label: string;
    path: string;
};
