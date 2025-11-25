'use client'

import { NavigationTypes } from "@/app/types/navigation"
import { createContext,  useContext,  useEffect,  useRef, useState } from "react";


const NavigationContext = createContext<NavigationTypes | null>(null);

const NavigationProvider = ({ children }: { children: React.ReactNode}) => {
    
    // REFS DAS SEÇÕES
    const intro = useRef<HTMLElement>(null);
    const about = useRef<HTMLElement>(null);
    const timeline = useRef<HTMLElement>(null);
    const diferencial = useRef<HTMLElement>(null);
    const contato = useRef<HTMLElement>(null);

    // ACTIVE SECTION
    const [active, setActive] = useState<string | null>(null);
    
    // OBSERVER
    useEffect(() => {
        const sections = [
            { id: 'intro', ref: intro },
            { id: 'about', ref: about },
            { id: 'timeline', ref: timeline },
            { id: 'diferencial', ref: diferencial },
            { id: 'contato', ref: contato },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        setActive(id);
                    }
                });
            },
            {
                threshold: 0.5, // mais suave
                rootMargin: '-100px 0px -40% 0px',
            }
        );

        sections.forEach(({ ref }) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    //  SCROLL COM OFFSET 
    const scrollToSection = (section: keyof NavigationTypes['refs']) => {

        const refs = {
            intro,
            about,
            timeline,
            diferencial,
            contato,
        };

        const element = refs[section]?.current;
        
        if (!element) return;

        if (element) {

            const offset = -80; 
            const y = element.getBoundingClientRect().top + window.scrollY + offset;
            const target = y - offset;

            window.scrollTo({ top: target, behavior: 'smooth' });

        }  
    };
    
    return (
        <NavigationContext.Provider
            value={{
                refs: { intro, about, timeline, diferencial, contato },
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
    
    const context = useContext(NavigationContext);
    if (!context) throw new Error('useNavigation must be used within NavigationProvider');
    return context
}

