'use client';

import styles from './WrapperCard.module.css';
import { WrapperCardProps } from '@/core/interfaces/wrapperCard';
import { cn } from '@/components/helpers/lib/utils/utils';

const WrapperCard =  ({ children, className }: WrapperCardProps) => {
    return (
        <div
            className= {cn(
                // Estilos base (padrão)
                // LAYOUT & RESPONSIVIDADE
                "relative w-full mx-auto", // Ocupa 100% da largura disponível até o max-width
                "p-4 sm:p-6 md:p-8",      
                // ESTILO VISUAL (Glassmorphism para combinar com o Graph 3D)
                "rounded-2xl border border-white/10",
                "bg-black/60 backdrop-blur-xl",

                className 
            )}
        >
            {children}
        </div>
    );
};

export default WrapperCard;