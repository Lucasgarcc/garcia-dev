"use client"

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

interface TypingEffectProps {
    text: string;
    className?: string;
}

const TypingEffect = ({ text = '', className = '' }: TypingEffectProps) => {
    const ref = React.useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    // Estado para forçar o componente a remontar e reiniciar o efeito
    const [iteration, setIteration] = React.useState(0);

    // Efeito para gerenciar o loop
    React.useEffect(() => {
        if (!isInView) return;

        // Calculamos o tempo total: (número de caracteres * delay) + tempo de espera no final
        // Vou usar um valor estimado baseado no seu texto, ou podemos calcular dinamicamente.
        const totalChars = text.replace(/<[^>]*>/g, '').length;
        const animationDuration = (totalChars * 30) + 3000; // 30ms por char + 3s de pausa

        const timer = setTimeout(() => {
            setIteration(prev => prev + 1);
        }, animationDuration);

        return () => clearTimeout(timer);
    }, [isInView, iteration, text]);

    const content = React.useMemo(() => {
        if (typeof document === 'undefined') return null;

        const div = document.createElement('div');
        div.innerHTML = text;
        let charCount = 0;

        const traverse = (node: Node): React.ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.split('').map((char) => {
                    const delay = charCount * 0.02;
                    const currentIndex = charCount;
                    charCount++;

                    return (
                        <motion.span
                            // O iteration na key garante que o React destrua e recrie o span no loop
                            key={`char-${iteration}-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.05,
                                delay,
                                ease: "linear"
                            }}
                        >
                            {char}
                        </motion.span>
                    );
                });
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                const nodeKey = `el-${iteration}-${charCount}`;

                if (element.tagName === 'BR') return <br key={`br-${iteration}-${charCount++}`} />;

                return React.createElement(
                    element.tagName.toLowerCase(),
                    {
                        key: nodeKey,
                        className: element.className,
                        style: { display: 'inline' }
                    },
                    Array.from(element.childNodes).map(traverse)
                );
            }
            return null;
        };

        return Array.from(div.childNodes).map(traverse);
    }, [text, isInView, iteration]); // Adicionado iteration aqui

    return (
        <h2
            ref={ref}
            className={`${className} tracking-tighter whitespace-pre-wrap`}
        >
            {/* Renderiza apenas se estiver na view para economizar CPU */}
            {isInView && content}
        </h2>
    );
}

export default TypingEffect;