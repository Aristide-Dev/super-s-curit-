import type { ReactNode } from 'react';
import GlobalFullscreenLoader from '@/components/global-fullscreen-loader';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export function AppChrome({ children }: { children: ReactNode }) {
    return (
        <TooltipProvider delayDuration={0}>
            {children}
            <GlobalFullscreenLoader />
            <Toaster />
        </TooltipProvider>
    );
}
