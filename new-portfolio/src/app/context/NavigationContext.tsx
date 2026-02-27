'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { NavigationTypes, NavigationPage } from '@/app/types/navigation';

const NavigationContext = createContext<NavigationTypes | null>(null);

const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const page: NavigationPage = pathname.startsWith('/projects') ? 'projects' : 'home';

    // ---------- HOME REFS ----------
    const intro = useRef<HTMLElement>(null);
    const about = useRef<HTMLElement>(null);
    const timeline = useRef<HTMLElement>(null);
    const diferencial = useRef<HTMLElement>(null);
    const contato = useRef<HTMLElement>(null);

    // ---------- PROJECTS REFS ----------
    const post = useRef<HTMLElement>(null);
    const skills = useRef<HTMLElement>(null);
    const experience = useRef<HTMLElement>(null);
    const portfolio = useRef<HTMLElement>(null);
    const posts = useRef<HTMLElement>(null);
    const differential = useRef<HTMLElement>(null);

    const [active, setActive] = useState<string | null>(null);

    // refs ativas por página
    const pageRefs =
        page === 'home'
            ? { intro, about, timeline, diferencial, contato }
            : { post, skills, experience, portfolio, posts, differential };

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
    }, [page]);

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
                    home: { intro, about, timeline, diferencial, contato },
                    projects: { post, skills, experience, portfolio, posts, differential },
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
