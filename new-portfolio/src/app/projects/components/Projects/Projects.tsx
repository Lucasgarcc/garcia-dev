'use client';
import { useCallback, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import styles from './Projects.module.css';
import GitGraph from '../Projects/GitGraph/GitGraph';
import { useProjectsSelection } from './context/ProjectsSelectionContext';
import WrapperCard from '@/app/_components/ui/WrapperCard/WrapperCard';
import useMediaQuery from '@/app/core/hooks/MediaQuery/MediQuery';
import { BsArrowRight } from 'react-icons/bs';
import { InteractiveGrid } from '@/app/_components/ui/InteractiveGrid/InteractiveGrid';
import { ScrollHelper } from '@/app/_components/helpers/ScrollHelper/ScrollHelper';
import { FiGithub } from "react-icons/fi";
import { useLanguage } from '@/app/core/context/LanguageContext';

const Projects = () => {

    const isMobile = useMediaQuery('(max-width: 1024px)');
    const { t } = useLanguage();

    const mainRef = useRef(null);
    const container3DRef = useRef(null);
    const pathRef = useRef(null);
    const labelCurveSwipe = t.projects.explore;
    const [isActive, setIsActive] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const { 
        selectedProjectData, 
        selectedProject,  
        isMode3D,
        isCardOpen,
        setIsCardOpen,
        setSelectedProject 
    } = useProjectsSelection();
    const selectedProjectTranslation = selectedProjectData
        ? t.projectItems[selectedProjectData.id as keyof typeof t.projectItems]
        : undefined;

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

    const onProjectSelect = useCallback((id: string) => {
    
        setSelectedProject(id);
        setIsCardOpen(true);
  
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
    }, [setSelectedProject, setIsCardOpen]);

    useLayoutEffect(() => {
        if (!isActive) return;

        let cancelled = false;
        let animationContext: gsap.Context | undefined;

        const handleScroll = () => {
            // Se o usuário estiver no topo (menos de 50px de scroll), mostra.
            // Se ele rolar para baixo (iniciando o GitGraph), esconde.
            if (window.scrollY > 5000) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        const setupAnimation = async () => {
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            if (cancelled) return;

            gsap.registerPlugin(ScrollTrigger);
            window.addEventListener("scroll", handleScroll);

            animationContext = gsap.context(() => {
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
        };

        void setupAnimation();
    
        return () => {
            cancelled = true;
            animationContext?.revert();
            window.removeEventListener("scroll", handleScroll)
        };
    }, [isActive, onProjectSelect]);

    return (
        <div ref={mainRef} className={styles.projectsWrapper}>
            {/* Botão e Morph que você tinha removido a lógica */}
            {!isActive && (
                <div className={styles.overlay}>
                    <button type="button" onClick={handleStart} className={`
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

            <div
                className={`
                    ${styles.perspectiveStage} 
                    ${isMode3D ? styles['mode-3d-on'] : ''}
                `} 
                style={{ visibility: isActive ? 'visible' : 'hidden'}}
                >                  
                {/* Wrapper para fixar o helper no canto direito inferior */}
                <div className={`
                        fixed bottom-150 right-10 z-[120] transition-all 
                        duration-1000 pointer-events-none
                        ${isVisible && !isMode3D ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                    `}
                >
                        <ScrollHelper text={t.projects.scrollToExplore} />
                </div>

                <div ref={container3DRef} className={styles.gitGraphContainer}>
                    <InteractiveGrid>
                        <GitGraph />
                    </InteractiveGrid>
                </div>

                {selectedProjectData && selectedProject && isCardOpen && (
                    <>
                        {/* OVERLAY DE BLUR: Garanta que o z-index seja menor que o do WrapperCard */}
                        <div className={`
                                fixed inset-0 z-[80] transition-all duration-700
                                ${isModalOpen ? 'backdrop-blur-md bg-black/40 pointer-events-auto' : 'backdrop-blur-none pointer-events-none'}
                            `} onClick={() => setIsModalOpen(false)} />

                                        {/* MODAL DETALHADO */}
                                        <div role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500
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
                                             <h2 id="project-modal-title" className={`${styles.titleDetailModal} text-3xl font-bold text-white`}>
                                        {selectedProjectTranslation?.title || selectedProjectData.title || selectedProjectData.id}
                                    </h2>
                                        <button
                                        type="button"
                                        aria-label={t.projectPage.closeProject}
                                         className={`${styles.btnCloseDatailModal} hover:text-gray transition-colors`}
                                        onClick={() => {

                                            setIsModalOpen(false);
                                            setIsCardOpen(false);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </header>

                                 <div className="mt-6 space-y-4">
                                     <p className="leading-relaxed">{selectedProjectTranslation?.description || selectedProjectData.description}</p>
                                     <div className="flex flex-wrap gap-2 pt-4">
                                        {selectedProjectData.tags?.map((tag: string) => (
                                             <span key={tag} className={`${styles.tagDatailModal} px-3 py-1 bg-white/5 border border-white/10 text-xs `}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                 <footer className="mt-8 flex gap-4">

                                    {selectedProjectData.deployUrl && (
                                        <span className={styles.buttonDeploy}>  
                                             <a href={selectedProjectData.deployUrl} target="_blank" rel="noopener noreferrer" className={`${styles.deployLink} flex-1 text-center py-2 rounded-lg transition-colors font-medium`}>
                                            {t.projectPage.viewMore}
                                        </a> 
                                            <BsArrowRight size={18} className={styles.icon}/>
                                        </span>
                                     
                                    )}

                                    {selectedProjectData.repoUrl && (
                                        <span className={styles.buttonRepo}>
                                            <a href={selectedProjectData.repoUrl} target="_blank" rel="noopener noreferrer" className={`${styles.repoLink} flex-1 text-center py-2 rounded-lg`}>
                                                {t.projectPage.github}
                                            </a>
                                            <FiGithub className={styles.icon}/>
                                        </span>
      
                                        
                                    )}
                                </footer>
                            </WrapperCard>
                        </div>

                        {/* MINI MENU MOBILE: Corrigido o !selectedProject */}
                        {!isModalOpen && isMobile && (
                            <div className={`${styles.containerMenuMobile} fixed left-1/2 -translate-x-1/2 z-[110]`}>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className={`${styles.btnVeiwProjectMobile} px-6 py-3 font-bold shadow-lg 
                                    flex justify-center items-center gap-2 animate-bounce`}
                                >
                                    <span>{t.projectPage.details}: {selectedProjectData.id}</span>
                                    <BsArrowRight size={18} strokeWidth={.9} className={styles.icon}/>
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
