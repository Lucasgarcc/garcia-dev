'use client';

import '../../../globals.css';
import React from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Styles from './Differential.module.css';

const Differential = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography marginTop={4} color='var(--primary-c-2)' textTransform={'uppercase'}
                    variant="h4" className={Styles.differentialTitle} marginBottom={10} textAlign={'center'} fontFamily='var(--font-title)' gutterBottom fontWeight={500}>
                    O que me diferencia<span className={Styles.differentialDetail}>?</span>
                </Typography>
                <div className={Styles.differentialContainer}>
                    <div className={Styles.differentialItem}>   
                        <Typography color='var(--primary-c-0-1)' textTransform={'uppercase'} marginTop={2}
                            className={Styles.differentialSubTitle} textAlign={'center'} fontFamily='var(--font-title)' gutterBottom fontWeight={500}>  
                            <strong>Evolução contínua e domínio técnico em Frontend moderno </strong>
                        </Typography>

                        <Typography className={Styles.differentialDescription} variant="body1" marginTop={2} maxWidth={'100%'}>
                            Domínio prático de tecnologias como Angular, React, TypeScript, Ionic e Webpack, aplicadas em sistemas reais. Mais do que escrever código, aplico boas práticas de desenvolvimento — ESLint, Git Flow, SEO e acessibilidade — unindo técnica, performance e experiência do usuário. <br></br>
                        <strong style={{color:'var(--primary-c-0-4)'}}>Diferencial:</strong> união entre domínio técnico, boas práticas de engenharia e foco na experiência do usuário.
                        </Typography>
                    </div>
                    <div className={Styles.differentialItem}>
                        
                        <Typography color='var(--primary-c-0-1)' textTransform={'uppercase'} marginTop={2}
                            className={Styles.differentialSubTitle}textAlign={'center'} fontFamily='var(--font-title)' gutterBottom fontWeight={500}>  
                            <strong>Mentalidade de crescimento e transição estratégica para o Full Stack </strong>
                        </Typography>

                        <Typography className={Styles.differentialDescription} variant="body1" marginTop={2} maxWidth={'100%'}>
                            Atuo com uma mentalidade de aprendizado contínuo, construindo uma base sólida como Frontend Pleno e evoluindo de forma estruturada rumo ao Full Stack. A combinação de resiliência, curiosidade e visão de longo prazo guia minha evolução profissional.<br></br>

                            <strong style={{color:'var(--primary-c-0-4)'}} >Diferencial:</strong> compromisso com o crescimento constante e ampliação de impacto técnico e criativo.
                        </Typography>
                    </div>
                </div>
            </motion.div>

        </>
    )
};

export default Differential;
