"use client";
import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string) {
    // Inicializamos com false para evitar erro de hidratação
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Verifica se o window existe (segurança extra)
        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);

        // Define o valor inicial corretamente
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        // Adiciona o listener
        media.addEventListener("change", listener);

        // remove o listener ao desmontar
        return () => media.removeEventListener("change", listener);
    }, [query]); // Removido 'matches' daqui para evitar loops

    return matches;
}