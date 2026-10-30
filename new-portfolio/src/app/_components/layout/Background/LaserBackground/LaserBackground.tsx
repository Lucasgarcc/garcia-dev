'use client';
import '../../../../globals.css'
import Particles from 'react-tsparticles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useThemeMode } from '@/app/core/context/ThemeContext';
import { useNavigation } from '@/app/core/context/NavigationContext';

interface NetworkPoint { x: number; y: number; z: number; }

const POINT_COUNT = 150;

function NetworkSphereBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useThemeMode();
    const { page } = useNavigation();
    const reverseDirection = page === 'projects';

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const points: NetworkPoint[] = [];
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));
        const isDark = theme === 'dark';
        const detailColor = isDark ? '255, 255, 255' : '15, 15, 15';
        const accentColor = isDark ? '183, 233, 1' : '109, 146, 29';
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        let animationFrame = 0;
        let width = 0;
        let height = 0;
        let globeX = 0;

        for (let index = 0; index < POINT_COUNT; index += 1) {
            const y = 1 - (index / (POINT_COUNT - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = goldenAngle * index;
            points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            globeX = width * (reverseDirection ? 0.73 : 0.27);
        };

        const handlePointerMove = (event: PointerEvent) => {
            mouse.targetX = (event.clientX / width - 0.5) * 2;
            mouse.targetY = (event.clientY / height - 0.5) * 2;
        };

        const draw = (time: number) => {
            mouse.x += (mouse.targetX - mouse.x) * 0.035;
            mouse.y += (mouse.targetY - mouse.y) * 0.035;
            context.clearRect(0, 0, width, height);

            const scrollStep = Math.floor(window.scrollY / Math.max(height * 0.65, 1));
            const leftSide = reverseDirection ? 0.73 : 0.27;
            const rightSide = reverseDirection ? 0.27 : 0.73;
            const targetX = width < 700 ? width * 0.5 : width * (scrollStep % 2 === 0 ? leftSide : rightSide);
            globeX += (targetX - globeX) * 0.045;
            const centerX = globeX;
            const centerY = height * (width < 1500 ? 0.72 : reverseDirection ? 0.62 : 0.45);
            const sphereRadius = Math.min(width, height) * (width < 700 ? 0.31 : 0.29);
            const rotationY = time * 0.00012 + mouse.x * 0.28;
            const rotationX = mouse.y * 0.16;
            const projected = points.map((point) => {
                const x1 = point.x * Math.cos(rotationY) - point.z * Math.sin(rotationY);
                const z1 = point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY);
                const y1 = point.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
                const z2 = point.y * Math.sin(rotationX) + z1 * Math.cos(rotationX);
                return { x: centerX + x1 * sphereRadius, y: centerY + y1 * sphereRadius, z: z2 };
            });

            context.lineWidth = isDark ? 0.65 : 0.95;
            for (let first = 0; first < projected.length; first += 1) {
                const point = projected[first];
                if (point.z < -0.15) continue;
                for (let second = first + 1; second < projected.length; second += 1) {
                    const other = projected[second];
                    const distance = Math.hypot(point.x - other.x, point.y - other.y);
                    if (other.z < -0.15 || distance > sphereRadius * 0.34) continue;
                    const depthAlpha = (Math.min(point.z, other.z) + 0.15) * (isDark ? 0.13 : 0.46);
                    const alpha = Math.max(isDark ? 0.035 : 0.2, depthAlpha);
                    context.strokeStyle = `rgba(${detailColor}, ${alpha})`;
                    context.beginPath();
                    context.moveTo(point.x, point.y);
                    context.lineTo(other.x, other.y);
                    context.stroke();
                }
            }

            projected.forEach((point, index) => {
                if (point.z < -0.1) return;
                const alpha = Math.max(isDark ? 0.22 : 0.68, (point.z + 1) * (isDark ? 0.42 : 0.9));
                context.fillStyle = `rgba(${detailColor}, ${alpha})`;
                context.beginPath();
                context.arc(point.x, point.y, point.z > 0.55 ? 1.5 : 0.9, 0, Math.PI * 2);
                context.fill();
                if (index % 37 === 0) {
                    context.shadowColor = `rgba(${accentColor}, 0.8)`;
                    context.shadowBlur = 10;
                    context.fillStyle = `rgba(${accentColor}, 0.95)`;
                    context.beginPath();
                    context.arc(point.x, point.y, 2.4, 0, Math.PI * 2);
                    context.fill();
                    context.shadowBlur = 0;
                }
            });

            const arcStart = projected[18];
            const arcEnd = projected[94];
            if (arcStart && arcEnd && arcStart.z > 0 && arcEnd.z > 0) {
                context.strokeStyle = `rgba(${accentColor}, 0.9)`;
                context.lineWidth = 1.4;
                context.shadowColor = `rgba(${accentColor}, 0.75)`;
                context.shadowBlur = 12;
                context.beginPath();
                context.moveTo(arcStart.x, arcStart.y);
                context.quadraticCurveTo(centerX, centerY - sphereRadius * 0.72, arcEnd.x, arcEnd.y);
                context.stroke();
                context.shadowBlur = 0;
            }
            animationFrame = window.requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        animationFrame = window.requestAnimationFrame(draw);
        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [page, reverseDirection, theme]);

    return <canvas ref={canvasRef} className="tech-network-canvas" aria-hidden="true" />;
}

function LegacyLaserLines() {
    const particlesRef = useRef(null);
    const { theme } = useThemeMode();
    const isDark = theme === 'dark';
    const [scrollSpeed, setScrollSpeed] = useState(7);
    const [opacityValue, setOpacityValue] = useState(isDark ? 0.34 : 0.38);

    const particleColor = isDark ? '#fcfff2' : '#e6ffb1';
    const linkColor = isDark ? '#f4ffd4' : '#e6ffac';
    const shadowColor = isDark ? '#b7e901' : '#9abf4a';

    // Controla velocidade e brilho conforme scroll
    useEffect(() => {
        const handleScroll = () => {
            const speed = Math.min(10, Math.max(3, window.scrollY / 25));
            setScrollSpeed(speed);

            // Faz o brilho (opacity) pulsar conforme scroll
            const opacity = Math.min(isDark ? 0.52 : 0.62, (isDark ? 0.34 : 0.38) + window.scrollY / 1200);
            setOpacityValue(opacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDark]);

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <>
            <Particles
                id="interactive-laser-lines"
                init={particlesInit}
                ref={particlesRef}
                options={{
                fullScreen: { 
                    enable: true, 
                    zIndex: 1
                },
                background: { color: 'transparent' },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: 'push' }, // cria mais linhas ao clicar
                        onHover: {
                            enable: true,
                            mode: 'repulse', // afasta as partículas do mouse
                            parallax: { enable: true, force: 60, smooth: 10 },
                        },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 3 },
                        repulse: {
                            distance: 60,
                            duration: 0.5,
                            speed: 1,
                        },
                    },
                },
                particles: {
                    color: { value: particleColor },
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
                        value: { min: 50, max: 100 },
                        animation: { enable: true, speed: 2, minimumValue: 50, sync: false },
                    },
                    rotate: {
                        value: { min: 50, max: 100 },
                        animation: { enable: true, speed: 2, sync: false },
                    },
                    //stroke: { width: 1, color: '#cc', opacity: 0.5 },
                    shadow: { enable: true, color: shadowColor, blur: 12 },
                    links: {
                        enable: true,
                        distance: 140,
                        color: linkColor,
                        opacity: isDark ? 0.2 : 0.42,
                        width: .9,
                    },
                },
                detectRetina: true,
                }}
            />
        </>
    );
}

export default function InteractiveLaserLines() {
    return (
        <>
            <NetworkSphereBackground />
        </>
    );
}
