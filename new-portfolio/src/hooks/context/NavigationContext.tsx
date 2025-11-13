'use client'

import { NavigationTypes } from "@/app/types/navigation"
import { createContext,  useContext,  useRef } from "react";


const NavigationContext = createContext<NavigationTypes | null>(null);

const NavigationProvider = ({ children }: { children: React.ReactNode}) => {
    
    const intro = useRef<HTMLElement>(null);
    const about = useRef<HTMLElement>(null);
    const timeline = useRef<HTMLElement>(null);
    const diferencial = useRef<HTMLElement>(null);
    const contato = useRef<HTMLElement>(null);

    const scrollToSection = (section: keyof NavigationTypes['refs']) => {
        
        const refs = {
            intro,
            about,
            timeline,
            diferencial,
            contato,
        };
        const element = refs[section]?.current;

        if (element) {
            element.scrollIntoView({ behavior: 'smooth'});
        }   
    };
    
    return (
        <NavigationContext.Provider 
            value={{ refs: { intro, about, timeline, diferencial, contato }, scrollToSection }}>
            {children}
        </NavigationContext.Provider>

    )

};
export default NavigationProvider;

export const useNavigation = () => {
    
    const context = useContext(NavigationContext);
    if (!context) throw new Error('useNavigation must be used within NavigationProvider');
    return context
}

