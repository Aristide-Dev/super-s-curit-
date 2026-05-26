import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { duration as durationRoute } from '@/routes/analytics';

const VISITOR_COOKIE = 'aristech_vid';
const SESSION_KEY = 'aristech_sid';

/**
 * Sends page duration to the server when the user leaves.
 * Attached to every page via the marketing layout.
 */
export function useVisitTracker() {
    const startedAt = useRef<number>(Date.now());
    const path = useRef<string>(window.location.pathname);

    useEffect(() => {
        const unsubscribe = router.on('navigate', () => {
            sendDuration(path.current, startedAt.current);
            startedAt.current = Date.now();
            path.current = window.location.pathname;
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const flush = () => {
            sendDuration(path.current, startedAt.current);
        };

        const onVisibility = () => {
            if (document.visibilityState === 'hidden') {
                flush();
            }
        };

        window.addEventListener('beforeunload', flush);
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            window.removeEventListener('beforeunload', flush);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);
}

function sendDuration(currentPath: string, startedAt: number): void {
    const duration = Math.round((Date.now() - startedAt) / 1000);
    if (duration < 2) {
        return;
    }

    const payload = JSON.stringify({
        visitor_uuid: readCookie(VISITOR_COOKIE),
        session_id: readSessionId(),
        path: currentPath,
        duration,
    });

    const url = durationRoute.url();

    if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
    } else {
        fetch(url, {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
        }).catch(() => {});
    }
}

function readCookie(name: string): string | null {
    const prefix = `${name}=`;
    const cookies = document.cookie.split(';');
    for (const raw of cookies) {
        const cookie = raw.trim();
        if (cookie.startsWith(prefix)) {
            return decodeURIComponent(cookie.substring(prefix.length));
        }
    }
    return null;
}

function readSessionId(): string {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
}
