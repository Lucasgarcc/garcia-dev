'use client';

import styles from './Post.module.css';
import { motion, Variants, Easing } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Image from 'next/image';
import { IoIosLock } from "react-icons/io";
import { PiDog } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";
import { BsArrowRight } from 'react-icons/bs';
import useMediaQuery from '@/app/core/hooks/MediaQuery/MediQuery';

const floatingVariants = (delay: number = 0): Variants => ({
    floating: {
        y: [0, -15, 0],
        rotate: [0, 1, -1, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut" as Easing
        }
    }
});

interface PostProps {
    title: string;
    content?: string;
    imageUrl?: string | null;
    deploy?: string;
    github?: string;
}

const Post = ({ title, content, imageUrl = null, deploy, github }: PostProps) => {
    const isMobile = useMediaQuery('(max-width: 428px)');

    return (
        <motion.div
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8 }}
            style={{padding: '1.5rem'}}
        >
            {/* 1. DEFINIÇÃO DO CLIP-PATH (MÁSCARA DA IMAGEM) */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
                        <path
                            transform="scale(0.01)"
                            d="M83.5,65Q74,80,57,87.5Q40,95,23.5,83Q7,71,13,53Q19,35,29,18.5Q39,2,56,11.5Q73,21,83,35.5Q93,50,83.5,65Z"
                        />
                    </clipPath>
                </defs>
            </svg>

            <Typography
                variant="h4"
                textTransform="uppercase"
                marginTop={8}
                marginBottom={4}
                padding={'.5rem'}
                fontFamily="var(--font-altric)"
                gutterBottom
                fontWeight={500}
                style={{ background: 'rgba(254, 254, 254, 0.7)' }}
                className={styles.postTitle} >
                Projeto destaque
            </Typography>

            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={styles.postContainer}
            >
                <div className={styles.postContent}>
                    {imageUrl && (
                        <div className={styles.relativeWrapper}>
                            {/* SVG invisível para definição do CLIP-PATH */}
                            <svg width="0" height="0" style={{ position: 'absolute' }}>
                                <defs>
                                <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
                                    <path
                                        transform="scale(0.01)"
                                        d="M83.5,65Q74,80,57,87.5Q40,95,23.5,83Q7,71,13,53Q19,35,29,18.5Q39,2,56,11.5Q73,21,83,35.5Q93,50,83.5,65Z"
                                    />
                                    </clipPath>
                                </defs>
                            </svg>

                            <motion.div
                                variants={floatingVariants(0)}
                                animate="floating" // Chama a chave definida nas variantes
                                className={`${styles.badge} ${styles.badgeTopLeft}`}
                            >
                                <IoIosLock fontSize={26.5} className={styles.icon} /> JWT Auth
                            </motion.div>

                            <motion.div
                                variants={floatingVariants(1.5)}
                                animate="floating"
                                className={`${styles.badge} ${styles.badgeBottomRight}`}
                            >
                                <PiDog fontSize={26.5} className={styles.icon} /> Social Feed
                            </motion.div>

                            {/* SVG VISÍVEL (O Contorno que já está ok) */}
                            <svg viewBox="0 0 100 100" className={styles.blobOutline}>
                                <path
                                    d="M83.5,65Q74,80,57,87.5Q40,95,23.5,83Q7,71,13,53Q19,35,29,18.5Q39,2,56,11.5Q73,21,83,35.5Q93,50,83.5,65Z"
                                    transform="translate(-7, -2)"
                                    stroke="var(--secondary-c-1)"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            </svg>

                            {/* A IMAGEM (Agora forçada a seguir o formato acima) */}
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={imageUrl || '/placeholder.png'}
                                    alt={title}
                                    width={800}
                                    height={800}
                                    className={styles.postImage}
                                    priority
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.postInfoContainer}
                >
                    <h2 className={styles.postTitleProject}>{title}</h2>
                    <p className={`${styles.postContent} description`} >{content}</p>

                    <div className={styles.buttons}>
                        <Button variant="contained" sx={{
                            backgroundColor: 'var(--bg-primary-n)', marginTop: '1rem', color: 'var(--color-text-n)',
                            fontFamily: 'var(--font-roboto)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.5rem',
                            borderRadius: '.4rem', fontSize: '1.1rem', border: "1px solid var(--color-text-n)",
                            transition: 'all 0.2s ease',
                            ":hover": { gap: '1rem', backgroundColor: "var(--primary-c-0-4)", color: "var(--primary-c-0-5)", transform: "translateY(-2px)" },
                            textTransform: 'none'
                        }}>
                            <a href={deploy} target="_blank" className="button button-flex"> Ver Mais </a>
                            <BsArrowRight size={18} strokeWidth={.9} className={styles.icon} />
                        </Button>

                        <Button variant="contained" sx={{
                            backgroundColor: 'var(--primary-c-0-3)', marginTop: '1rem', color: 'var(--color-text-n)',
                            fontFamily: 'var(--font-roboto)', borderRadius: '.4rem',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.5rem',
                            fontSize: '1.1rem', border: "1px solid var(--color-text-n)",
                            transition: 'all 0.2s ease',
                            ":hover": { gap: '1rem', backgroundColor: "var(--bg-secondary-g)", color: "var(--color-text)", transform: "translateY(-2px)" },
                            textTransform: 'none'
                        }}>
                            <a href={github} target="_blank" className="button button-flex"> GitHub </a>
                            <FiGithub />
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Post;