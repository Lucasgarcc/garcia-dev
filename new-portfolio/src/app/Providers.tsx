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
        }, 5000);

        return () => clearTimeout(timer);
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