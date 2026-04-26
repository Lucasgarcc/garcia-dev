'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';
import GitGraph from '../Projects/GitGraph/GitGraph';
import { useProjectsSelection } from './context/ProjectsSelectionContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
    const mainRef = useRef(null);
    const container3DRef = useRef(null);
    const pathRef = useRef(null);
    const labelCurveSwipe = `{ Explorar Projetos }`;

    // 1. Volte o estado para false para a animação inicial funcionar
    const [isActive, setIsActive] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const { selectedProjectId, setSelectedProject } = useProjectsSelection();

    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    // 2. Função de entrada (Curve Swipe)
    const handleStart = () => {
        setIsTransitioning(true);

        const tl = gsap.timeline({
            onComplete: () => setIsActive(true)
        });
        tl.to(pathRef.current, { attr: { d: start }, duration: 0.6, ease: "power2.in" })
            .to(pathRef.current, { attr: { d: end }, duration: 0.4, ease: "power2.out" });
    };

    const onProjectSelect = (id: string) => {
        setSelectedProject(id);
        const tl3D = gsap.timeline();
        tl3D.to(container3DRef.current, {
            rotationX: 40,
            rotationY: -15,
            duration: 1.2,
            ease: "power3.out"
        })
            // O nó selecionado SALTA (Z positivo)
            .to(`.project-group[data-project-id="${id}"]`, {
                z: 200,            // Ele flutua 200px acima do gráfico!
                scale: 1.2,
                duration: 1.2,
                ease: "back.out(2)"
            }, "-=1")
            // Os outros projetos AFUNDAM (Z negativo)
            .to(`.project-group:not([data-project-id='${id}'])`, {
                z: -150,           // Eles mergulham 150px para baixo
                opacity: 1.1,
                filter: "blur(6px)",
                duration: 1
            }, "<");
    };

    useLayoutEffect(() => {
        if (!isActive) return;

        let ctx = gsap.context(() => {
            // 3. RECUPERANDO A ANIMAÇÃO DO GRAPH (O que estava faltando)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1.2,
                    pin: true,
                }
            });

            tl.to("#main-trunk", { strokeDashoffset: 0, duration: 3, ease: "none" })
                .to(".git-branch-path", { strokeDashoffset: 0, stagger: 0.5, duration: 1.2 }, "-=2.5")
                .from(".git-branch-line", { scaleY: 0, transformOrigin: "bottom", stagger: 0.5 }, "-=1.5")
                .from("circle", { scale: 0, stagger: 0.2, duration: 0.5, ease: "back.out(2)" }, "-=1.2")
                .to(".project-label", { opacity: 1, y: "-=20", stagger: 0.3, duration: 0.6 }, "-=1");

            // 4. Listeners de clique
            const groups = document.querySelectorAll<SVGGElement>('.project-group');
            groups.forEach(group => {
                group.addEventListener('click', () => {
                    const id = group.getAttribute('data-project-id');
                    if (id) onProjectSelect(id);
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, [isActive]);

    return (
        <div ref={mainRef} className={styles.projectsWrapper}>
            {/* Botão e Morph que você tinha removido a lógica */}
            {!isActive && (
                <div className={styles.overlay} onClick={handleStart}>
                    <button className={`
                        ${styles.btnExplore} 
                        ${isTransitioning ? styles.buttonEffect : ''}
                    `}>
                        <span>
                            {labelCurveSwipe}
                        </span>
                    </button>
                    <svg className={styles.morphSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path ref={pathRef} fill="#91bf27" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
                    </svg>
                </div>
            )}

            <div className={styles.perspectiveStage} style={{ visibility: isActive ? 'visible' : 'hidden' }}>
                <div ref={container3DRef} className={styles.gitGraphContainer}>
                    <GitGraph />
                </div>

                {selectedProjectId && (
                    <div className={styles.detailsModal}>
                        <h3>Projeto: {selectedProjectId}</h3>
                        <button onClick={() => {
                            setSelectedProject(null);
                            gsap.to(container3DRef.current, { rotationX: 0, rotationY: 0, z: 0, duration: 1 });
                            gsap.to(".project-group", { opacity: 1, filter: "none", duration: 0.5 });
                        }}>Fechar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;