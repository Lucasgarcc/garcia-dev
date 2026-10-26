'use client';

import NavigationProvider from './core/context/NavigationContext';
import ThemeProvider from './core/context/ThemeContext';
import LoadingWrapper from './_components/layout/LoadingWrapper/LoadingWrapper';

export default function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider>
            <NavigationProvider>
                <LoadingWrapper>{children}</LoadingWrapper>
            </NavigationProvider>
        </ThemeProvider>
    );
}
