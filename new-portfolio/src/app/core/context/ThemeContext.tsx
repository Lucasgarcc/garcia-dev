'use client';

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';

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
        return 'light';
    }

    try {
        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }
    } catch {
        // Alguns navegadores podem bloquear o acesso ao localStorage.
    }

    // Se não houver histórico, respeita a preferência que o usuário já usa no sistema operacional
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

const getThemeSnapshot = (): ThemeMode => {
    const domTheme = document.documentElement.dataset.theme;

    if (domTheme === 'dark' || domTheme === 'light') {
        return domTheme;
    }

    return getStoredTheme();
};

const getServerThemeSnapshot = (): ThemeMode => 'light';

const subscribeToTheme = (onChange: () => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === THEME_STORAGE_KEY) onChange();
    };

    const handleThemeChange = () => onChange();
    const handleSystemChange = (event: MediaQueryListEvent) => {
        try {
            if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        } catch {
            // Mantém a atualização do snapshot mesmo sem acesso ao storage.
        }

        onChange();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('portfolio-theme-change', handleThemeChange);
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('portfolio-theme-change', handleThemeChange);
        mediaQuery.removeEventListener('change', handleSystemChange);
    };
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
    const theme = useSyncExternalStore(
        subscribeToTheme,
        getThemeSnapshot,
        getServerThemeSnapshot,
    );

    const setTheme = (nextTheme: ThemeMode) => {
        applyTheme(nextTheme);

        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch {
            // Mantém o tema funcionando mesmo sem persistência local.
        }

        window.dispatchEvent(new Event('portfolio-theme-change'));
    };

    const value = useMemo<ThemeContextValue>(
        () => ({
            isDark: theme === 'dark',
            theme,
            setTheme,
            toggleTheme: () => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
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
