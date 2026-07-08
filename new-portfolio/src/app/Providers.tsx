'use client';

import { useState, useEffect } from 'react';
import NavigationProvider from './core/context/NavigationContext';
import ThemeProvider from './core/context/ThemeContext';
import LoadingTech from './_components/ui/Loading/LoadingTech';

export default function Providers({ children }: { children: React.ReactNode }) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);
    }, []);

    return (
        <ThemeProvider>
            <NavigationProvider>

                {isLoading ? (
                    <LoadingTech />
                    ) : ( 
                    <>                    
                        {children}
                    </>
                )}
            </NavigationProvider>
        </ThemeProvider>
    );
}
