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

    // Divide o array de skills em dois para as duas linhas
    const half = Math.ceil(skills.length / 2);
    const row1 = skills.slice(0, half);
    const row2 = skills.slice(half);

    useEffect(() => {
        const startAnimations = () => {
            // Linha 1: Direita para Esquerda
            controlsRow1.start({
                x: [0, -1000],
                transition: { duration: 25, repeat: Infinity, ease: "linear" }
            });

            // Linha 2: Esquerda para Direita (começa deslocado)
            controlsRow2.start({
                x: [-1000, 0],
                transition: { duration: 25, repeat: Infinity, ease: "linear" }
            });
        };

        startAnimations();

        // Timer para parar as duas animações suavemente
        const timer = setTimeout(() => {
            controlsRow1.stop();
            controlsRow2.stop();
        }, 6000);

        return () => clearTimeout(timer);
    }, [controlsRow1, controlsRow2]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {/* Linha 1 */}
                <div className={styles.fadeMask}>
                    <motion.div animate={controlsRow1} className={styles.row}>
                        {[...row1, ...row1, ...row1].map((skill, i) => (
                            <Icon key={`r1-${i}`} {...skill} />
                        ))}
                    </motion.div>
                </div>

                {/* Linha 2 */}
                <div className={styles.fadeMask}>
                    <motion.div animate={controlsRow2} className={styles.row}>
                        {[...row2, ...row2, ...row2].map((skill, i) => (
                            <Icon key={`r2-${i}`} {...skill} />
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default SkillGrid;