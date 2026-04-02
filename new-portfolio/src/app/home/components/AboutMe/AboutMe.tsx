'use client'
import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Styles from './AboutMe.module.css';
import Statistics from './Statistics/Statistics';
import CodeCard from './CodeCard/CodeCard';
import ViableResume from './ViableResume/ViableResume';

const AboutMe = () => {
    return (

        <motion.div
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8 }}
            className={Styles.sectionWrapper}
        >
            <Typography
                marginTop={4} 
                color='var(--primary-c-2)'  
                textTransform={'uppercase'}
                variant="h4"
                className={Styles.title}
                marginBottom={4}
                textAlign={'center'} 
                fontFamily='var(--font-title)' 
                gutterBottom fontWeight={450}>
                Sobre Mim
            </Typography>
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={Styles.aboutMeContainer}>
                <div className={Styles.aboutContentText}>

                    <Typography className={Styles.aboutContentDescription} variant="body1" marginTop={5} maxWidth={'100%'} letterSpacing={0} textAlign={'justify'}>

                        Desenvolvedor Web e criador de experiências digitais que unem design, propósito e tecnologia.
                        Trabalho com foco em Frontend e UI/UX Design, desenvolvendo interfaces que conectam pessoas e ideias.
                        Acredito que cada projeto é uma oportunidade de evoluir — técnica e pessoalmente — e sigo construindo minha trajetória com curiosidade, resiliência e vontade de ir além.
                        Meu objetivo é crescer como Desenvolvedor Frontend Pleno e, no futuro, expandir meus horizontes como Full Stack, sempre mantendo o olhar criativo e a busca pela excelência em cada detalhe.

                    </Typography>

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={Styles.aboutContentStatis}>
                        <Statistics
                            label="Anos de Experiência"
                            quantity={2}
                        />
                        <Statistics
                            label="Projetos Concluídos"
                            quantity={5}
                        />
                        <Statistics
                            label="Clientes Satisfeitos"
                            quantity={3}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className={Styles.aboutContentButton}>
                        <ViableResume />
                    </motion.div>

                    <div
                        className={Styles.aboutContentImage}>
                        <CodeCard />
                    </div>
                </div>

            </motion.div>
        </motion.div>


    );
};

export default AboutMe;