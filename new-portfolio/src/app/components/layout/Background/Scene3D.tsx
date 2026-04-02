'use client';
import { useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import Scene3D from './Scene3D.module.css';
import ProfileCard from './ProfileCard/ProfileCard';
import OrbitingLogo from './OrbitingLogo/OrbitingLogo';
import profile from '@assets/profile_ligth.png';
import react from '@assets/react.png';
import html from '@assets/html.png';
import css from '@assets/css3.png';
import node from '@assets/nodejs-11492982.png';
import ts from '@assets/typescript.png';
import js from '@assets/JS.png';
import angular from '@assets/angular.png';

const logos = [react, html, css, node, ts, js, angular];


export default function OrbitLogos() {
    const [time, setTime] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Hook para animação de quadro 
     * @param callback Função a ser chamada em cada quadro
     * @param delay Atraso entre os quadros (em milissegundos)
     */
    useAnimationFrame((t) => {
        setTime(t / 1000); // 1 segundo = 1 unidade
    });

    const radius = 150;

    return (
        <>
            <div className={Scene3D.areaContainer} ref={containerRef}>
                {/* Card com foto central */}
                <ProfileCard image={profile} alt="Minha foto"/>

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