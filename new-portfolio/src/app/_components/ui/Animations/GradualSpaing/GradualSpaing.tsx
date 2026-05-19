'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

interface GradualSpacingProps {
    children: React.ReactNode;
    className?: string;
}

const GradualSpacing = ({ children, className = "" }: GradualSpacingProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Tipando explicitamente o retorno e os nós
    const renderCharacters = (node: React.ReactNode, baseKey: string): React.ReactNode => {
        // 1. Caso: Texto ou Número
        if (typeof node === 'string' || typeof node === 'number') {
            return node.toString().split('').map((char, i) => (
                <motion.span
                    key={`${baseKey}-${i}`}
                    initial={{ opacity: 0, x: -18 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (i + baseKey.length) * 0.05 }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                    {char}
                </motion.span>
            ));
        }

        // 2. Caso: Elementos JSX (span, strong, etc)
        if (React.isValidElement(node)) {
            // Definimos que o elemento possui props que incluem children
            const element = node as React.ReactElement<{ children?: React.ReactNode }>;

            return React.cloneElement(element, {
                key: baseKey,
                children: renderCharacters(element.props.children, `${baseKey}-child`)
            });
        }

        // 3. Caso: Fragmentos ou Arrays
        if (Array.isArray(node)) {
            return node.map((child, index) => renderCharacters(child, `${baseKey}-${index}`));
        }

        return node;
    };

    return (
        <div
            ref={containerRef}
            className={`flex flex-wrap ${className}`}
            style={{ gap: '0.1em' }}
        >
            <AnimatePresence>
                {React.Children.map(children, (child, index) =>
                    renderCharacters(child, `node-${index}`)
                )}
            </AnimatePresence>
        </div>
    );
};

export default GradualSpacing;