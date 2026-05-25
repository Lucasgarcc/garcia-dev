'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    isDark: boolean;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'portfolio-theme';

/* Alinhando com o seu novo design: o topo do seu site é #0d0d0d no escuro.
  Deixar a meta tag combinando evita divisões feias na tela de dispositivos móveis.
*/
const LIGHT_THEME_COLOR = '#fdfdfd';
const DARK_THEME_COLOR = '#0d0d0d';

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getStoredTheme = (): ThemeMode => {
    if (typeof window === 'undefined') {
        return 'dark'; // Como seu design escuro é o principal, podemos usar como fallback seguro
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }

    // Se não houver histórico, respeita a preferência que o usuário já usa no sistema operacional
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

const applyTheme = (theme: ThemeMode) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    // Atualiza dinamicamente a barra de navegação do navegador (mobile/scrolling)
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
        themeMeta.setAttribute('content', theme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
    }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());

    // Sincroniza o estado com o DOM e o LocalStorage sempre que o tema mudar
    useEffect(() => {
        applyTheme(theme);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    // Ouve mudanças na preferência do sistema se o usuário não tiver uma escolha salva
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e: MediaQueryListEvent) => {
            const hasStored = window.localStorage.getItem(THEME_STORAGE_KEY);
            if (!hasStored) {
                setThemeState(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({
            isDark: theme === 'dark',
            theme,
            setTheme: setThemeState,
            toggleTheme: () => {
                setThemeState(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
            },
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

export const useThemeMode = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useThemeMode must be used inside ThemeProvider');
    }

    return context;
};