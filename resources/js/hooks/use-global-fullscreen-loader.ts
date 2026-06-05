import { router } from '@inertiajs/react';
import { useEffect, useState, useSyncExternalStore } from 'react';

type InertiaVisit = {
    method?: string;
    prefetch?: boolean;
    only?: string[];
};

type LoaderState = {
    activeVisits: number;
    message?: string;
    subtitle?: string;
};

let state: LoaderState = {
    activeVisits: 0,
};

const listeners = new Set<() => void>();
let routerSubscribed = false;

function emit(): void {
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    return () => listeners.delete(listener);
}

function getSnapshot(): LoaderState {
    return state;
}

function shouldShowLoader(visit: InertiaVisit): boolean {
    if (visit.prefetch) {
        return false;
    }

    if (visit.only && visit.only.length > 0) {
        return false;
    }

    const method = (visit.method ?? 'get').toLowerCase();

    return method !== 'get' && method !== 'head';
}

function loaderMessage(method?: string): {
    message: string;
    subtitle: string;
} {
    return {
        message: 'Traitement en cours...',
        subtitle:
            method === 'delete'
                ? 'Suppression en cours, veuillez patienter'
                : 'Veuillez patienter quelques instants',
    };
}

function hideLoader(): void {
    if (state.activeVisits === 0) {
        return;
    }

    state = {
        activeVisits: state.activeVisits - 1,
        message: state.activeVisits - 1 > 0 ? state.message : undefined,
        subtitle: state.activeVisits - 1 > 0 ? state.subtitle : undefined,
    };
    emit();
}

function subscribeToRouterOnce(): void {
    if (routerSubscribed) {
        return;
    }

    routerSubscribed = true;

    router.on('start', (event) => {
        const visit = (event as CustomEvent<{ visit: InertiaVisit }>).detail
            .visit;

        if (!shouldShowLoader(visit)) {
            return;
        }

        const labels = loaderMessage(visit.method);

        state = {
            activeVisits: state.activeVisits + 1,
            message: labels.message,
            subtitle: labels.subtitle,
        };
        emit();
    });

    router.on('finish', hideLoader);
    router.on('error', hideLoader);
    router.on('cancel', hideLoader);
}

export function useGlobalFullscreenLoader(): {
    isLoading: boolean;
    message?: string;
    subtitle?: string;
} {
    useEffect(() => {
        subscribeToRouterOnce();
    }, []);

    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

    return {
        isLoading: snapshot.activeVisits > 0,
        message: snapshot.message,
        subtitle: snapshot.subtitle,
    };
}
