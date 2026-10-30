'use client';

import React, {useState, useRef, useEffect } from 'react';
import Styles from './Timeline.module.css';
import {Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { GiGraduateCap } from "react-icons/gi";
import { ImBriefcase } from "react-icons/im";
import { BsCalendarWeek } from "react-icons/bs";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/core/context/LanguageContext';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const timelineData = {
	formacao: [
		{
		year: '2022 - 2022',
		title: 'Introdução ao Desenvolvimento Web',
		titleEn: 'Introduction to Web Development',
		location: 'Remoto / #KICK',
		locationEn: 'Remote / #KICK',
		},
		{
			year: '2021 - 2023',
			title: 'Análise e Desenvolvimento de Sistemas',
			titleEn: 'Systems Analysis and Development',
			location: 'Ribeirão Preto - SP / UNIDERP Ribeirão Preto',
		},
		{
			year: '2023 - 2026',
			title: 'Frontend – Designer UI / UX',
			titleEn: 'Frontend – UI / UX Designer',
			location: 'Rio de Janeiro - RJ / ORIGAMID',
		},
		{
			year: '2024 - 2024',
			title: 'JavaScript – ES6+',
			titleEn: 'JavaScript – ES6+',
			location: 'Rio de Janeiro - RJ / ORIGAMID',
		},
		{
			year: '2023 - 2024',
			title: 'Inglês',
			titleEn: 'English',
			location: 'Guariba - SP / VPFI',
		},

		{
			year: '2024 - 2025',
			title: 'React',
			titleEn: 'React',
			location: 'Rio de Janeiro - RJ / ORIGAMID',
		},
		{
			year: '2025',
			title: 'Angular - TypeScript * Ionic & AngularJS',
			titleEn: 'Angular - TypeScript * Ionic & AngularJS',
			location: 'Guariba - SP / Avulso Online',
		},
        {
            year: '2026',
            title: 'Next.js - TypeScript',
            titleEn: 'Next.js - TypeScript',
            location: 'Guariba - SP / Avulso Online',
        },

	],
	trabalho: [
		{
			year: '2014 - 2024',
			title: 'Modelador de Plástico',
			titleEn: 'Plastic Molding Operator',
			location: 'Guariba - SP / Indústria Plástica',
		},
		{
			year: '2025 - 2026',
			title: 'Desenvolvedor Front-end Júnior (web)',
			titleEn: 'Junior Front-end Developer (web)',
			location: 'Jaboticabal / F5 Software',
		},
	],
};
 
const Timeline: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'formacao' | 'trabalho'>('formacao');
    const { language, t } = useLanguage();


    const isEnglish = language === 'en';
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    // Estado para avisar o GSAP que o Framer Motion terminou de trocar as abas
    const [isReady, setIsReady] = useState(false);

    useGSAP(() => {
        // Limpeza profunda de Triggers
        ScrollTrigger.getAll().forEach(t => t.kill());

        if (!gridRef.current || !progressRef.current || !isReady) return;

        // Reset imediato da barra
        gsap.set(progressRef.current, { height: '0%' });

        const ctx = gsap.context(() => {
            const triggerHook = 'top 50%';

            // 1. Linha de Progresso
            gsap.to(progressRef.current, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: triggerHook,
                    end: 'bottom 50%, left 50%',
                    scrub: 0.1,
                    invalidateOnRefresh: true,
                }
            });

            // 2. Itens e Nodes
            const items = gridRef.current?.querySelectorAll(`.${Styles.timelineItem}`);

            items?.forEach((item) => {
                const node = item.querySelector(`.${Styles.nodeIndicator}`);
                const content = item.querySelector(`.${Styles.content}`);

                if (!node || !content) return;

                // Forçamos o estado inicial "escondido" para evitar o bug da imagem 2
                gsap.set([content, node], { opacity: 0, y: 30 });

                ScrollTrigger.create({
                    trigger: node,
                    start: triggerHook,
                    end: 'bottom 0%',
                    onEnter: () => {
                        node.classList.add('node-active');
                        node.classList.add('active');
                        gsap.to([content, node], { opacity: 1, y: 0, duration: 0.4, overwrite: true });
                    },
                    onLeaveBack: () => {
                        node.classList.remove('node-active');
                        node.classList.remove('active');
                        gsap.to([content, node], { opacity: 0, y: 30, duration: 0.3, overwrite: true });
                    },
                });
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, { dependencies: [activeTab, isReady], scope: containerRef });

    return (
        <motion.div
            ref={containerRef}
            className={Styles.timelineContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Typography marginTop={15} color='var(--green-500)' textTransform={'uppercase'}
                variant="h4" className={Styles.title} marginBottom={4} textAlign={'center'} fontFamily='var(--font-altric)' gutterBottom fontWeight={450}
            >
                {t.common.qualifications}
            </Typography>
            <div className={Styles.tabs}>
                <button
                    onClick={() => { setIsReady(false); setActiveTab('formacao'); }}
                    className={`${Styles.tabButton} ${activeTab === 'formacao' ? Styles.active : ''}`}
                >
                    <GiGraduateCap size={24} className={Styles.icon} /> {t.common.education}
                </button>
                <button
                    onClick={() => { setIsReady(false); setActiveTab('trabalho'); }}
                    className={`${Styles.tabButton} ${activeTab === 'trabalho' ? Styles.active : ''}`}
                >
                    <ImBriefcase size={20} className={Styles.icon} /> {t.common.work}
                </button>
            </div>

            <div ref={gridRef} className={Styles.timelineGrid}>
                <div className={Styles.timelineGuide}></div>
                <div ref={progressRef} className={Styles.progressLine}></div>

                <AnimatePresence mode="wait" onExitComplete={() => ScrollTrigger.refresh()}>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
       
                        onAnimationComplete={() => setIsReady(true)}
                    >
                        {timelineData[activeTab].map((item, index) => (
                            <div
                                key={`${activeTab}-${index}`}
                                className={`${Styles.timelineItem} ${index % 2 === 0 ? Styles.left : Styles.right}`}
                            >
                                <div className={Styles.nodeIndicator}></div>
                                <div className={Styles.content}>
                                    <h3>{isEnglish ? item.titleEn : item.title}</h3>
                                    <p>{isEnglish ? ((item as { locationEn?: string }).locationEn ?? item.location) : item.location}</p>
                                    <span className={Styles.year}>
                                        <BsCalendarWeek size={14} /> {item.year}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Timeline;
