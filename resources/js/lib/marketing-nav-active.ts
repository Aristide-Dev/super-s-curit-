export function isMarketingNavActive(
    href: string,
    currentUrl: string,
): boolean {
    const normalizedHref = href.replace(/\/$/, '') || '/';
    const normalizedCurrent = currentUrl.replace(/\/$/, '') || '/';

    if (normalizedHref === '/') {
        return normalizedCurrent === '/';
    }

    return (
        normalizedCurrent === normalizedHref ||
        normalizedCurrent.startsWith(`${normalizedHref}/`)
    );
}
