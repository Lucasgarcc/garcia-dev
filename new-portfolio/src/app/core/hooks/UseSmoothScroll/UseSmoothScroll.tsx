'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
    useEffect(() => {

        const lenis = new Lenis({
            duration: 1.2, // velocidade da inércia
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // curva suave
            smoothWheel: true, // ativa rolagem fluida com o mouse
        });

        let frameId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);
};
