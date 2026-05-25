'use client';
import { useAnimationFrame } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Scene3D from './Scene3D.module.css';
import ProfileCard from './ProfileCard/ProfileCard';
import OrbitingLogo from './OrbitingLogo/OrbitingLogo';
import profile from '@assets/profile_ligth.png';
import profileDark from '@assets/profile_dark.png';
import react from '@assets/react.png';
import html from '@assets/html.png';
import css from '@assets/css3.png';
import node from '@assets/nodejs-11492982.png';
import ts from '@assets/typescript.png';
import js from '@assets/JS.png';
import angular from '@assets/angular.png';
import { useThemeMode } from '@/core/context/ThemeContext';
const logos = [react, html, css, node, ts, js, angular];


export default function OrbitLogos() {
    const [time, setTime] = useState(0);
    const [radius, setRadius] = useState(150);
    const containerRef = useRef<HTMLDivElement>(null);
    const { isDark } = useThemeMode();

    /**
     * Hook para animação de quadro 
     * @param callback Função a ser chamada em cada quadro
     * @param delay Atraso entre os quadros (em milissegundos)
     */
    useAnimationFrame((t) => {
        setTime(t / 1000); // 1 segundo = 1 unidade
    });

    useEffect(() => {
        const updateRadius = () => {
            const width = window.innerWidth;

            if (width <= 480) {
                setRadius(72);
                return;
            }

            if (width <= 768) {
                setRadius(92);
                return;
            }

            if (width <= 1024) {
                setRadius(112);
                return;
            }

            if (width <= 1280) {
                setRadius(132);
                return;
            }

            setRadius(150);
        };

        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
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
                        logo={logo}
                        index={index}
                        time={time}
                        radius={radius}
                        logosLength={logos.length}
                    />
                ))}
            </div>
        </>
    );
}
