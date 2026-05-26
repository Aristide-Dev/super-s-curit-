export type AristechSocialLinks = {
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    github: string | null;
};

export type AristechConfig = {
    email: string;
    phone: string;
    phone_href: string;
    rccm: string;
    social: AristechSocialLinks;
};
