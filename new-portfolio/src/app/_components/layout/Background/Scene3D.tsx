'use client';
import { useEffect, useRef } from 'react';
import Scene3D from './Scene3D.module.css';
import ProfileCard from './ProfileCard/ProfileCard';
import OrbitingLogo from './OrbitingLogo/OrbitingLogo';
import profile from '@assets/profile_ligth.png';
import profileDark from '@assets/profile_dark.png';
import ReactLogo from '../../../../assets/icons/react-3d.svg';
import HtmlLogo from '../../../../assets/icons/html5-3d.svg';
import CssLogo from '../../../../assets/icons/css3-3d.svg';
import NodeLogo from '../../../../assets/icons/nodejs-3d.svg';
import TypescriptLogo from '../../../../assets/icons/typescript-3d.svg';
import JavascriptLogo from '../../../../assets/icons/javascript-3d.svg';
import AngularLogo from '../../../../assets/icons/angular-3d.svg';
import { useThemeMode } from '@/core/context/ThemeContext';
const logos = [ReactLogo, HtmlLogo, CssLogo, NodeLogo, TypescriptLogo, JavascriptLogo, AngularLogo];


export default function OrbitLogos() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const radiusRef = useRef(150);
    const { isDark } = useThemeMode();

    /**
     * Hook para animação de quadro 
     * @param callback Função a ser chamada em cada quadro
     * @param delay Atraso entre os quadros (em milissegundos)
     */
    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;

            if (width <= 480) {
                radiusRef.current = 72;
                return;
            }

            if (width <= 768) {
                radiusRef.current = 92;
                return;
            }

            if (width <= 1024) {
                radiusRef.current = 112;
                return;
            }

            if (width <= 1280) {
                radiusRef.current = 132;
                return;
            }

            radiusRef.current = 150;
        };

        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    useEffect(() => {
        let frameId = 0;
        let lastFrame = 0;
        let isVisible = true;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const frameInterval = 1000 / 120;
        const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; });

        if (containerRef.current) observer.observe(containerRef.current);

        const animate = (timestamp: number) => {
            frameId = requestAnimationFrame(animate);
            if (!isVisible || document.hidden || reducedMotion || timestamp - lastFrame < frameInterval) return;
            lastFrame = timestamp;
            const time = timestamp / 1000;

            logoRefs.current.forEach((element, index) => {
                if (!element) return;
                const angle = (index / logos.length) * Math.PI * 2.5 + time * 0.50;
                const yAngle = Math.sin(time + index) * 0.5;
                const x = Math.cos(angle) * radiusRef.current;
                const y = Math.sin(yAngle) * radiusRef.current * 0.5;
                const z = Math.sin(angle) * radiusRef.current;
                element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`;
            });
        };

        frameId = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(frameId);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className={Scene3D.areaContainer} ref={containerRef}>
                {/* Card com foto central */}
                <ProfileCard image={isDark ? profileDark : profile } alt="Meu Avatar Ghibli"/>

                {/* Logos Orbitando - passa logosLength dinamicamente */}
                {logos.map((logo, index) => (
                    <OrbitingLogo
                        key={index}
                        ref={(element) => { logoRefs.current[index] = element; }}
                        logo={logo}
                    />
                ))}
            </div>
        </>
    );
}
