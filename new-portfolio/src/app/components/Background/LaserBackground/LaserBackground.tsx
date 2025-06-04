'use client';
import '../../../globals.css'
import Particles from 'react-tsparticles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function InteractiveLaserLines() {
    const particlesRef = useRef(null);
    const [scrollSpeed, setScrollSpeed] = useState(7);
    const [opacityValue, setOpacityValue] = useState(0.3);

    // Controla velocidade e brilho conforme scroll
    useEffect(() => {
        const handleScroll = () => {
            const speed = Math.min(25, Math.max(3, window.scrollY / 50));
            setScrollSpeed(speed);

            // Faz o brilho (opacity) pulsar conforme scroll
            const opacity = Math.min(0.6, 0.3 + window.scrollY / 1000);
            setOpacityValue(opacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="interactive-laser-lines"
            init={particlesInit}
            ref={particlesRef}
            options={{
                fullScreen: { enable: true },
                background: { color: 'var(--background)' },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: 'push' }, // cria mais linhas ao clicar
                        onHover: {
                            enable: true,
                            mode: 'repulse', // afasta as partículas do mouse
                            parallax: { enable: false },
                        },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 3 },
                        repulse: {
                            distance: 120,
                            duration: 0.5,
                            speed: 5,
                        },
                    },
                },
                particles: {
                    color: { value: '' },
                    move: {
                        enable: true,
                        speed: scrollSpeed,
                        direction: 'none',
                        outModes: { default: 'out' },
                        straight: false,
                        random: true,
                        bounce: false,
                    },
                    number: { value: 45, density: { enable: true, area: 900 } },
                    opacity: {
                        value: opacityValue,
                        animation: {
                            enable: true,
                            speed: .5,
                            minimumValue: 0.1,
                            sync: false,
                        },
                    },
                    shape: { type: 'line' },
                    size: {
                        value: { min: 60, max: 110 },
                        animation: { enable: true, speed: 4, minimumValue: 50, sync: false },
                    },
                    rotate: {
                        value: { min: 0, max: 360 },
                        animation: { enable: true, speed: 10, sync: false },
                    },
                    //stroke: { width: 1, color: '#cc', opacity: 0.5 },
                    shadow: { enable: true, color: '#fff', blur: 12 },
                    links: {
                        enable: true,
                        distance: 140,
                        color: '#ffffff',
                        opacity: 0.25,
                        width: 1,
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
