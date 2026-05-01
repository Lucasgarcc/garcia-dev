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

// Variantes corrigidas para usar a chave 'floating'
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
    deploy?: string
    github?: string
}

const Post = ({ title, content, imageUrl = null, deploy, github }: PostProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* SVG DEFINITION PARA O CLIP-PATH */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
                        <path
                            transform="scale(0.0066) translate(70, 75)"
                            d="M39,-68.8C46.8,-63,46.9,-45,55.7,-31.5C64.5,-18.1,82.1,-9,87.2,2.9C92.3,14.9,84.9,29.8,76.1,43.4C67.4,57,57.2,69.3,44.3,70.7C31.4,72,15.7,62.5,3.2,57C-9.4,51.5,-18.7,50.1,-31.1,48.4C-43.5,46.7,-58.9,44.8,-64,36.7C-69.1,28.6,-63.9,14.3,-60.2,2.2C-56.4,-10,-54.1,-19.9,-50.4,-30.5C-46.7,-41,-41.6,-52.2,-33,-57.6C-24.4,-63,-12.2,-62.6,1.7,-65.6C15.6,-68.5,31.1,-74.7,39,-68.8Z"
                        />
                    </clipPath>
                </defs>
            </svg>

            <Typography
                color="var(--primary-c-0-3)"
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
                            <div className={styles.blobShadow}>
                                <motion.div
                                    initial={{ opacity: 0, x: -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className={styles.imageWrapper}
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={title}
                                        className={styles.postImage}
                                        width={1200}
                                        height={675}
                                        priority
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.textContent}
                >
                    <h2 className={styles.postTitleProject}>{title}</h2>
                    <p className={`${styles.postContent} description`} >{content}</p>

                    <div className={styles.buttons}>
                        <Button variant="contained" sx={{
                            backgroundColor: 'var(--bg-primary-n)', marginTop: '1rem', color: 'var(--color-text-n)',
                            fontFamily: 'var(--font-roboto)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.5rem',
                            borderRadius: '.4rem',
                            textAlign: 'center',
                            fontSize: '1.1rem',
                            border: "1px solid var(--color-text-n)",
                            transition: 'gap 0.2s ease',
                            ":hover": {
                                gap: '1rem', 
                                backgroundColor: "var(--primary-c-0-4)",
                                color: "var(--primary-c-0-5)",
                                border: "1px solid var(--primary-c-0-2)",
                                transform: "translateY(-2px)",
                            },
                            textTransform: 'none'
                        }}>

                            <a href={deploy} target="_blank" className="button button-flex" aria-label="Ver Mais">
                                Ver Mais  
                            </a>
                            <BsArrowRight size={18} strokeWidth={.9} className={styles.icon}/>
                        </Button>
                        <Button variant="contained" sx={{
                            backgroundColor: 'var(--primary-c-0-3)', marginTop: '1rem', color: 'var(--color-text-n)',
                            fontFamily: 'var(--font-roboto)',
                            borderRadius: '.4rem',
                            display:'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap:'.5rem',
                            textAlign: 'center',
                            fontSize: '1.1rem',
                            border: "1px solid var(--color-text-n)",
                            transition: 'gap 0.2s ease',
                            ":hover": {
                                gap: '1rem', 
                                backgroundColor: "var(--bg-secondary-g)",
                                color: "var(--color-text)",
                                border: "1px solid var(--color-text-secondary)",
                                transform: "translateY(-2px)",
                            },
                            textTransform: 'none'
                        }}>

                            <a href={github} target="_blank" className="button button-flex" aria-label="GitHub">
                                GitHub
                            </a> 
                            <FiGithub />
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default Post;