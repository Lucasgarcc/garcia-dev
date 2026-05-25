'use client';

import NavigationProvider from './core/context/NavigationContext';
import ThemeProvider from './core/context/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <NavigationProvider>
                {children}
            </NavigationProvider>
        </ThemeProvider>
    );
}
