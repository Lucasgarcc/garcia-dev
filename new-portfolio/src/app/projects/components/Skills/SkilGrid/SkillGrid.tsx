'use client';

import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import Icon from '../Icon/Icon';
import { Skill } from '@/app/core/interfaces/skill';
import styles from './SkillGrid.module.css';

interface SkillGridProps {
    skills: Skill[];
}

const SkillGrid = ({ skills }: SkillGridProps) => {
    const controlsRow1 = useAnimationControls();
    const controlsRow2 = useAnimationControls();
    // Divide o array de skills em duas pistas
    const half = Math.ceil(skills.length / 2);
    const baseRow1 = skills.slice(0, half);
    const baseRow2 = skills.slice(half);

    /* A MÁGICA DO PREENCHIMENTO:
       Se a sua lista de ícones for pequena, triplicar não basta. 
       Multiplicamos a lista por 5 ou 6 vezes. Isso garante uma esteira gigante 
       que cobre qualquer monitor (Ultra-wide, 4K, etc.) e elimina COMPLETAMENTE as lacunas.
    */
    const row1 = Array(6).fill(baseRow1).flat();
    const row2 = Array(6).fill(baseRow2).flat();

    useEffect(() => {
        const startAnimations = () => {
            /* Como multiplicamos a lista por 6 partes idênticas lá em cima,
               o ponto exato de loop invisível agora passa a ser 1 parte de 6,
               ou seja: (100 / 6) = -16.666%
            */

            // Linha 1: Direita para Esquerda
            controlsRow1.start({
                x: [0, "-16.666%"],
                transition: {
                    duration: 35, // Velocidade uniforme
                    repeat: Infinity,
                    ease: "linear"
                },
            });

            // Linha 2: Esquerda para Direita
            controlsRow2.start({
                x: ["-16.666%", 0],
                transition: {
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear"
                }
            });
        };

        // Um leve timeout de 100ms garante que o navegador já renderizou os ícones 
        // e sabe o tamanho exato da pista antes da animação começar. Isso mata o delay/travamento.
        const timer = setTimeout(startAnimations, 100);
        return () => clearTimeout(timer);
    }, [controlsRow1, controlsRow2, row1.length]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* Linha 1 */}
                <div className={styles.fadeMask}>
                    <motion.div animate={controlsRow1} className={styles.row}>
                        {row1.map((skill, i) => (
                            <Icon key={`r1-${skill.id || i}-${i}`} {...skill} />
                        ))}
                    </motion.div>
                </div>

                {/* Linha 2 */}
                <div className={styles.fadeMask}>
                    <motion.div animate={controlsRow2} className={styles.row}>
                        {row2.map((skill, i) => (
                            <Icon key={`r2-${skill.id || i}-${i}`} {...skill} />
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default SkillGrid;
