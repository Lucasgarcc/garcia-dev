import type React from 'react';

export type NavigationPage = 'home' | 'projects';

export type SectionRefs = Record<
    string,
    React.RefObject<HTMLElement | null>
>;

export interface NavigationTypes {
    page: NavigationPage;

    refs: {
        home: SectionRefs;
        projects: SectionRefs;
    };

    active: string | null;
    setActive: (id: string | null) => void;
    scrollToSection: (id: string) => void;
}
