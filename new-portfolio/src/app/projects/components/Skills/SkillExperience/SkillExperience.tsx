'use client';

import { useEffect, useState } from "react";
import styles from './SkillExperience.module.css';
import { CardUi } from "@/app/core/interfaces/cardUi";
import { HiArrowRight } from "react-icons/hi";
import Card from "../../../../_components/ui/Card/Card";

const SkillExperience = ({ title, subtitle, icon, content }: CardUi) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Função para fechar com a tecla ESC
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsModalOpen(false);
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset'; // Cleanup
        };
    }, [isModalOpen]);

    return (
        <>
            <div className={styles.cardFront}>
                <div className={styles.iconContainer}>
                    {icon}
                </div>

                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <h2 className={styles.title}>{subtitle}</h2>}
                </div>

                <button
                    className={styles.seeMore}
                    onClick={() => setIsModalOpen(true)}
                >
                    Veja Mais <HiArrowRight />
                </button>
            </div>

            {/* Modal que exibe o conteúdo detalhado */}
            {isModalOpen && (
                <Card
                    title={title}
                    subtitle={subtitle}
                    content={content}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default SkillExperience;