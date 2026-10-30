'use client';

import { useSyncExternalStore } from 'react';
import LoadingTech from '@/app/_components/ui/Loading/LoadingTech';

let ready = false;
let revealStarted = false;
const listeners = new Set<() => void>();

const notifyReady = () => {
    if (ready) return;

    ready = true;
    listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    if (!revealStarted) {
        revealStarted = true;

        const reveal = () => {
            window.setTimeout(notifyReady, 3200);
        };

        if (document.readyState === 'complete') {
            reveal();
        } else {
            window.addEventListener('load', reveal, { once: true });
        }
    }

    return () => listeners.delete(listener);
};

const getSnapshot = () => ready;
const getServerSnapshot = () => false;

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const isReady = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return (
        <div aria-busy={!isReady}>
            {!isReady && <LoadingTech />}
            <div style={{ visibility: isReady ? 'visible' : 'hidden' }}>
                {children}
            </div>
        </div>
    );
}
