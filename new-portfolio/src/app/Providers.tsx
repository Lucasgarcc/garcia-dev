'use client';

import NavigationProvider from './core/context/NavigationContext';
import ThemeProvider from './core/context/ThemeContext';
import LanguageProvider from './core/context/LanguageContext';
import LoadingWrapper from './_components/layout/LoadingWrapper/LoadingWrapper';

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider>
            <LanguageProvider>
                <NavigationProvider>
                    <LoadingWrapper>{children}</LoadingWrapper>
                </NavigationProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
