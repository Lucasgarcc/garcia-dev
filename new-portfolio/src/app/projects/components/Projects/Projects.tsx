'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';
import GitGraph from '../Projects/GitGraph/GitGraph';
import { useProjectsSelection } from './context/ProjectsSelectionContext';
import WrapperCard from '@/app/_components/ui/WrapperCard/WrapperCard';
import useMediaQuery from '@/app/core/hooks/MediaQuery/MediQuery';
import { BsArrowRight } from 'react-icons/bs';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {

    const isMobile = useMediaQuery('(max-width: 1500px)');

    const mainRef = useRef(null);
    const container3DRef = useRef(null);
    const pathRef = useRef(null);
    const labelCurveSwipe = `{ Explorar Projetos }`;


    const [isActive, setIsActive] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    // Dentro do seu componente Projects
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { 
        selectedProjectData, 
        selectedProject, 
        isMode3D, 
        setIsMode3D,
        setSelectedProject 
    } = useProjectsSelection();

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

                {/* CONTAINER 3D: Removido o 'fixed inset-0 z-[100]' para não bloquear a tela */}
                <div ref={container3DRef}
                    className={`${styles.gitGraphContainer} transition-all duration-700
                        ${isModalOpen
                                        ? 'filter blur-sm scale-[0.95] opacity-50 pointer-events-none' // Bloqueia interação SÓ quando o modal abrir
                                        : 'filter-none scale-100 opacity-100'
                                    }
                    `}>
                    <GitGraph />
                </div>

                {selectedProjectData && (
                    <>
                        {/* OVERLAY DE BLUR: Garanta que o z-index seja menor que o do WrapperCard */}
                        <div className={`
                fixed inset-0 z-[80] transition-all duration-700
                ${isModalOpen ? 'backdrop-blur-md bg-black/40 pointer-events-auto' : 'backdrop-blur-none pointer-events-none'}
            `} onClick={() => setIsModalOpen(false)} />

                        {/* MODAL DETALHADO */}
                        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500
                ${isModalOpen
                                ? 'translate-y-0 opacity-100 pointer-events-auto'
                                : 'translate-y-full opacity-0 pointer-events-none'
                            } 
                ${!isMobile ? 'lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto' : ''} 
            `}>
                            <WrapperCard
                                className={`${styles.detailsModal} max-w-2xl border-t-4`}
                                style={{ borderTopColor: selectedProjectData.colorBranch }}
                            >
                                <header className="flex justify-between items-start">
                                    <h2 className={`${styles.titleDetailModal} text-3xl font-bold text-white`}>
                                        {selectedProjectData.title || selectedProjectData.id}
                                    </h2>
                                    <button
                                        className="text-white/50 hover:text-white transition-colors text-2xl"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsMode3D(true);
                                            setSelectedProject(null);
                                            gsap.to(container3DRef.current, { rotationX: 0, rotationY: 0, z: 0, duration: 1 });
                                            gsap.to(".project-group", { z: 0, opacity: 1, filter: "none", scale: 1, duration: 0.5 });
                                        }}
                                    >
                                        ✕
                                    </button>
                                </header>

                                <div className="mt-6 space-y-4">
                                    <p className="text-gray-200 leading-relaxed">{selectedProjectData.description}</p>
                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {selectedProjectData.tags?.map((tag: string) => (
                                            <span key={tag} className={`${styles.tagDatailModal} px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-200`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <footer className="mt-8 flex gap-4">
                                    {selectedProjectData.deployUrl && (
                                        <a href={selectedProjectData.deployUrl} target="_blank" className={`${styles.deployLink} flex-1 text-center py-2 rounded-lg font-medium`}>
                                            Ver Projeto
                                        </a>
                                    )}
                                </footer>
                            </WrapperCard>
                        </div>

                        {/* MINI MENU MOBILE: Corrigido o !selectedProject */}
                        {!isModalOpen && isMobile && (selectedProject && isMode3D) && (
                            <div className="fixed bottom-15 left-1/2 -translate-x-1/2 z-[110]">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className={`${styles.btnVeiwProjectMobile} px-6 py-3 font-bold shadow-lg flex items-center gap-2 animate-bounce`}
                                >
                                    <span>Detalhes: {selectedProjectData.id}</span>
                                    <BsArrowRight size={18} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Projects;