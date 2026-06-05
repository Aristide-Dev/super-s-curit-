import { FullscreenLoader } from '@/components/ui/fullscreen-loader';
import { useGlobalFullscreenLoader } from '@/hooks/use-global-fullscreen-loader';

export default function GlobalFullscreenLoader() {
    const { isLoading, message, subtitle } = useGlobalFullscreenLoader();

    return (
        <FullscreenLoader
            isLoading={isLoading}
            spinnerType="loader2"
            spinnerSize={56}
            message={message}
            subtitle={subtitle}
        />
    );
}
