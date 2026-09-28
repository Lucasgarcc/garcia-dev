'use client'
import React from 'react';
import { Typography } from '@mui/material';
import { motion, Variants, Easing } from 'framer-motion';
import Styles from './AboutMe.module.css';
import Statistics from './Statistics/Statistics';
import CodeCard from './CodeCard/CodeCard';
import ViableResume from './ViableResume/ViableResume';

import photoBio from '@assets/photbiograp.png';
import Image from 'next/image';
import { InteractiveGrid } from '@/app/_components/ui/InteractiveGrid/InteractiveGrid';

const floatingVariantCenter = (delay: number = 0): Variants => ({
    floating: {
        y: [0, 10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut" as Easing
        }
    }
});

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

const AboutMe = () => {
    return (

        <motion.div
            transition={{ duration: 0.8 }}
            className={Styles.sectionWrapper}
        >
            <Typography
                marginTop={10} 
                color='var(--green-500)'  
                textTransform={'uppercase'}
                variant="h4"
                marginBottom={0}
                className={Styles.aboutTitle}
                textAlign={'center'} 
                fontFamily='var(--font-altric)' 
                gutterBottom fontWeight={450}>
                Biografia
            </Typography>
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={Styles.aboutMeContainer}>
                <div className={Styles.aboutContent}>
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={Styles.aboutContentImage}>

                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            variants={floatingVariants(1.5)}
                            animate="floating" // Chama a chave definida nas variantes
                            className={`${Styles.badge} ${Styles.badgeTopLeft}`}
                        >
                            <Image
                                src={'/assets/weeb.svg'}
                                alt="Rosto imagem de perfil"
                                width={150}
                                height={150}
                                loading="lazy"
                                style={{ objectFit: 'contain' }}
                            /> 
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            variants={floatingVariants(1)}
                            animate="floating"
                            className={`${Styles.badge} ${Styles.badgeBottomRight}`}
                        >    
                            <Image
                                src={'/assets/future.svg'}
                                alt="Rosto imagem de perfil"
                                width={200}
                                height={250}
                                loading="lazy"
                                style={{ objectFit: 'contain' }}
                            /> 
                        </motion.div>
                        <InteractiveGrid className={Styles.containerHero}>
                            <motion.div
                                variants={floatingVariantCenter(0)}
                                animate="floating">
                                <Image 

                                    className={Styles.imageBio}
                                    src={photoBio}
                                    alt="Rosto imagem de perfil"
                                    width={1100}
                                    height={1100}
                                    loading="lazy"
                                    style={{ objectFit: 'contain' }}
                                /> 
                            </motion.div>

                        </InteractiveGrid>
 
                    </motion.div>
                    <div className={Styles.aboutContentText}>
                        <Typography className={Styles.aboutContentDescription} display={'block'} variant="body1" marginTop={5} fontWeight={450} maxWidth={'100%'} letterSpacing={0}>
                            Desenvolvedor Web e criador de experiências digitais que conectam design, tecnologia e propósito. 
                            Trabalho focado em Frontend e <strong className={Styles.aboutDatailsText}>UI/UX Design</strong>, criando interfaces intuitivas que aproximam marcas e pessoas. 
                            Acredito que cada projeto é uma oportunidade de evolução técnica e pessoal, trajetória que sigo construindo com curiosidade, resiliência e foco na excelência. 
                            Meu objetivo é consolidar minha atuação como Desenvolvedor Frontend Pleno e expandir horizontes como <strong className={Styles.aboutDatailsText}>Full Stack</strong>, sem abrir mão da criatividade em cada detalhe.
                        </Typography>

                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={Styles.aboutContentStatis}>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className={Styles.aboutContentButton}>
                            <ViableResume />
                        </motion.div>
                    </div>
    
                </div>

            </motion.div>
        </motion.div>


    );
};

export default AboutMe;