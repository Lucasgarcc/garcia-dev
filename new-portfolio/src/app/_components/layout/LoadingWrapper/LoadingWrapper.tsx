'use client';

import { useState, useEffect } from 'react';
import LoadingTech from '@/app/_components/ui/Loading/LoadingTech';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verifica se o navegador terminou de carregar tudo (imagens, fontes, etc)
        const handleLoad = () => {
            // Delay de 1.5s para o usuário apreciar sua animação tech
            setTimeout(() => setIsLoading(false), 1500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    // Se estiver carregando, mostra apenas o loader
    // Se terminou, mostra o conteúdo do site
    return (
        <>
            {isLoading && <LoadingTech />}
            <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
                {children}
            </div>
        </>
    );
}