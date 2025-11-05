'use client';

import React from 'react';
import '../../../globals.css';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';
import { IoMdArrowDropright } from 'react-icons/io';
import Styles from './Differential.module.css';

const Differential = () => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        {/* Título principal */}
        <Typography
            marginTop={15}
            color="var(--primary-c-2)"
            textTransform="uppercase"
            variant="h4"
            className={Styles.differentialTitle}
            marginBottom={10}
            textAlign="center"
            fontFamily="var(--font-title)"
            gutterBottom
            fontWeight={500}
        >
            Qual o meu diferencial
            <span className={Styles.differentialDetail}>?</span>
        </Typography>

            {/* Container de cards */}
            <div className={Styles.differentialContainer}>
                {/* CARD 1 */}
                <div className={Styles.differentialItem}>
                <Typography
                    color="var(--primary-c-0-1)"
                    variant="h4"
                    textTransform="uppercase"
                    marginTop={2}
                    className={Styles.differentialSubTitle}
                    fontFamily="var(--font-title)"
                    gutterBottom
                    fontWeight={500}
                >
                    <strong>
                    <FaLightbulb
                        size={40}
                        color="var(--primary-c-0-4)"
                        className={Styles.differentialIcon}
                    />{' '}
                    Evolução contínua e domínio técnico em Frontend moderno
                    </strong>
                </Typography>

                    <Typography
                        className={Styles.differentialDescription}
                        variant="body1"
                        maxWidth="100%"
                        component="div">
                        <span className={Styles.differentialInfo}>
                        Domínio prático de tecnologias como Angular, React, TypeScript,
                        Ionic e Webpack, aplicadas em sistemas reais. Mais do que escrever
                        código, aplico boas práticas de desenvolvimento — ESLint, Git
                        Flow, SEO e acessibilidade — unindo técnica, performance e
                        experiência do usuário.
                        </span>

                        <span className={Styles.differentialInfoEmphasis}>
                        <IoMdArrowDropright
                            size={50}
                            color="var(--primary-c-0-4)"
                        />
                            <div>
                                União entre domínio técnico, boas práticas de engenharia e foco
                                na experiência do usuário.
                            </div>
                        </span>
                    </Typography>
                </div>

                {/* CARD 2 */}
                <div className={Styles.differentialItem}>
                    <Typography
                        color="var(--primary-c-0-1)"
                        variant="h4"
                        textTransform="uppercase"
                        marginTop={2}
                        className={Styles.differentialSubTitle}
                        fontFamily="var(--font-title)"
                        gutterBottom
                        fontWeight={500}
                    >
                        <strong>
                        <GiBrain
                            size={70}
                            color="var(--primary-c-0-4)"
                            className={Styles.differentialIcon}
                        />{' '}
                        Mentalidade de crescimento e transição estratégica para o Full
                        Stack
                        </strong>
                    </Typography>

                    <Typography
                        className={Styles.differentialDescription}
                        variant="body1"
                        maxWidth="100%"
                        component="div"
                    >
                        <span className={Styles.differentialInfo}>
                        Atuo com uma mentalidade de aprendizado contínuo, construindo uma
                        base sólida como Frontend Pleno e evoluindo de forma estruturada
                        rumo ao Full Stack. A combinação de resiliência, curiosidade e
                        visão de longo prazo guia minha evolução profissional.
                        </span>

                        <span className={Styles.differentialInfoEmphasis}>
                        <IoMdArrowDropright
                            size={50}
                            color="var(--primary-c-0-4)"
                        />
                        <div>
                            Mentalidade de crescimento aliada a uma transição estratégica e
                            estruturada para o Full Stack.
                        </div>
                        </span>
                    </Typography>
                </div>
            </div>
        </motion.div>
    );
};

export default Differential;