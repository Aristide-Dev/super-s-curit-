export type AristechSocialLinks = {
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
    instagram: string | null;
    linkedin: string | null;
    github: string | null;
};

export type AristechConfig = {
    email: string;
    phone: string;
    phone_secondary: string | null;
    phone_href: string;
    address: string;
    rccm: string | null;
    social: AristechSocialLinks;
};
