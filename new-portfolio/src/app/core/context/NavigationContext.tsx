'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { NavigationTypes, NavigationPage } from '@/core/interfaces/navigation';

const NavigationContext = createContext<NavigationTypes | null>(null);

const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const page: NavigationPage = useMemo(() => {
        if (pathname.startsWith('/articles')) return 'articles';
        if (pathname.startsWith('/projects')) return 'projects';
        return 'home';
    }, [pathname]);

    // ---------- HOME REFS ----------
    const intro = useRef<HTMLElement>(null);
    const about = useRef<HTMLElement>(null);
    const timeline = useRef<HTMLElement>(null);
    const differential = useRef<HTMLElement>(null);
    const contact = useRef<HTMLElement>(null);

    // ---------- PROJECTS REFS ----------
    const post = useRef<HTMLElement>(null);
    const skills = useRef<HTMLElement>(null);
    const technicalLevel = useRef<HTMLElement>(null);
    const portfolio = useRef<HTMLElement>(null);
    const articles = useRef<HTMLElement>(null);

    // ---------- ARTICLES REFS (Novo) ----------
    // Referências para a estrutura modular do artigo
    const artContent = useRef<HTMLElement>(null); 
    const artCode = useRef<HTMLElement>(null);   
    const artRelated = useRef<HTMLElement>(null); 

    const [active, setActive] = useState<string | null>(null);

    // refs ativas por página
    const pageRefs = useMemo(() =>{
        switch (page) {
            case 'articles':
                return { artContent, artCode, artRelated };
            case 'projects':
                return { post, skills, technicalLevel, articles, portfolio,  differential };
            default:
                return { intro, about, timeline, differential, contact };
            }
     
    }, [page]);

    // ---------- INTERSECTION OBSERVER ----------
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        if (id) setActive(id);
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-100px 0px -40% 0px',
            }
        );

        Object.values(pageRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, [page, pageRefs]);

    // ---------- SCROLL ----------
    const scrollToSection = (id: string) => {
        const targetRef = pageRefs[id as keyof typeof pageRefs];
        if (!targetRef?.current) return;

        const offset = -80;
        const y =
            targetRef.current.getBoundingClientRect().top +
            window.scrollY +
            offset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <NavigationContext.Provider
            value={{
                page,
                refs: {
                    home: { intro, about, timeline, differential, contact },
                    projects: { post, skills, technicalLevel, articles ,portfolio, differential },
                    articles: { artContent, artCode, artRelated }
                },
                active,
                setActive,
                scrollToSection,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;

export const useNavigation = () => {
    const ctx = useContext(NavigationContext);
    if (!ctx) {
        throw new Error('useNavigation must be used inside NavigationProvider');
    }
    return ctx;
};
