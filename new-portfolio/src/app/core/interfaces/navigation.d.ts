
export type NavigationPage = 'home' | 'projects' | 'articles'; 

export type SectionRefs = Record<
    string,
    React.RefObject<HTMLElement | null>
>;

export interface NavigationTypes {
    page: NavigationPage;

    refs: {
        home: SectionRefs;
        projects: SectionRefs;
        articles: SectionRefs;
    };

    active: string | null;
    setActive: (id: string | null) => void;
    scrollToSection: (id: string) => void;
}
