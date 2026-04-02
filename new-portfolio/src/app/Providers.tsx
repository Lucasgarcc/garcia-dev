'use client';

import NavigationProvider from './core/context/NavigationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NavigationProvider>
            {children}
        </NavigationProvider>
    );
}
