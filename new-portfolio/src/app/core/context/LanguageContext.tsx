'use client';

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { messages } from '../i18n/translations';

export type Language = 'pt' | 'en';

interface LanguageContextValue {
    language: Language;
    t: typeof messages[Language];
    setLanguage: (language: Language) => void;
    toggleLanguage: () => void;
}

const LANGUAGE_STORAGE_KEY = 'portfolio-language';
const LANGUAGE_CHANGE_EVENT = 'portfolio-language-change';

const subscribeToLanguage = (onStoreChange: () => void) => {
    window.addEventListener('storage', onStoreChange);
    window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);

    return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
    };
};

const getLanguageSnapshot = (): Language => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage === 'en' ? 'en' : 'pt';
};

const getServerLanguageSnapshot = (): Language => 'pt';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore(
        subscribeToLanguage,
        getLanguageSnapshot,
        getServerLanguageSnapshot
    );

    useEffect(() => {
        document.documentElement.lang = language === 'pt' ? 'pt-br' : 'en';
    }, [language]);

    const setLanguage = (nextLanguage: Language) => {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
        window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
    };

    const value = useMemo(
        () => ({
            language,
            t: messages[language],
            setLanguage,
            toggleLanguage: () => setLanguage(language === 'pt' ? 'en' : 'pt'),
        }),
        [language]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider');
    }

    return context;
};
