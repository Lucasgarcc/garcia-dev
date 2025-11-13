export interface NavigationTypes {
    refs: {
        intro: React.RefObject<HTMLElement | null>;
        about: React.RefObject<HTMLElement | null>;
        timeline: React.RefObject<HTMLElement | null>;
        diferencial: React.RefObject<HTMLElement | null>;
        contato: React.RefObject<HTMLElement | null>;
    };
    scrollToSection: (section: keyof NavigationTypes['refs']) => void;
}
