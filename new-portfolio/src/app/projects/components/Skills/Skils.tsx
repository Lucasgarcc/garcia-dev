'use client';

import React from "react";
import Styles from './Skills.module.css';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import SkillGrid from "./SkilGrid/SkillGrid";

import { DiJsBadge } from "react-icons/di";
import { IoLogoAngular } from "react-icons/io5";
import { RiReactjsLine } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { BsBootstrapFill } from "react-icons/bs";
import { RiNodejsLine } from "react-icons/ri";
import { RiNpmjsFill } from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiFigmaFill } from "react-icons/ri";
import { FaGitAlt } from "react-icons/fa6";
import { Skill } from "@/app/core/interfaces/skill";

import SkillExperience from "./SkillExperience/SkillExperience";

import DesignServicesIcon from '@mui/icons-material/DesignServices';
import CodeIcon from '@mui/icons-material/Code';


const mySkills: Omit<Skill, 'id'>[]= [
 
    { name: 'JS Vanilla', icon: <DiJsBadge className={Styles.icon} />, shadowColor: '#facc15' },
    { name: 'Angular', icon: <IoLogoAngular className={Styles.icon} />, shadowColor: '#FF3F33' },
    { name: 'React', icon: <RiReactjsLine className={Styles.icon}/>, shadowColor: '#61DAFB'},
    { name: 'TypeScript', icon: <SiTypescript className={Styles.icon} />, shadowColor: '#3178C6' },
    { name: 'Next.js', icon: <RiNextjsFill className={Styles.icon} />, shadowColor: '#ffffff' },
    { name: 'Tailwind', icon: <RiTailwindCssFill className={Styles.icon} />, shadowColor: '#06B6D4' },
    { name: 'Bootstrap', icon: <BsBootstrapFill className={Styles.icon} />, shadowColor: '#a78bfa' },
    { name: 'Node.js', icon: <RiNodejsLine className={Styles.icon} />, shadowColor: '#339933' },
    { name: 'Npm', icon: <RiNpmjsFill className={Styles.icon} />, shadowColor: '#ff4824' },
    { name: 'Motion Frame', icon: <TbBrandFramerMotion className={Styles.icon } />, shadowColor: '#facc15' },
    { name: 'Figma', icon: <RiFigmaFill className={Styles.icon} />, shadowColor: '#03ffc8' },
    { name: 'Git', icon: <FaGitAlt className={Styles.icon} />, shadowColor: '#ff4824' },

];

const design = [
    { text: 'Concepção de Design Systems escaláveis e consistentes.' },
    { text: 'Arquitetura de informação focada em reduzir a carga cognitiva.' },
    { text: 'Prototipagem de alta fidelidade com micro-interações fluidas.' },
    { text: 'Interfaces Mobile-First com foco em acessibilidade (WCAG).' }
];

const developer = [
    { text: 'Desenvolvimento de SPA modernas utilizando ecossistemas baseados em React.' },
    { text: 'Interfaces responsivas com foco em Performance e SEO.' },
    { text: 'Consumo de APIs RESTful e gerenciamento de estado complexo.' },
    { text: 'Código limpo e modular seguindo as melhores práticas de Clean Code.' }
];


const Skills = () => {

    return (
        <> 
            <motion.div
                initial={{ opacity: 0, y: 90 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography
                    className={Styles.skillsTitle}
                    textTransform={'uppercase'}
                    variant="h4"
                    align='center'
                    textAlign={'center'}
                    fontFamily='var(--font-title)'
                    gutterBottom
                    fontWeight={500}
                    zIndex={1000}
                >
                Habilidades
                </Typography>
            </motion.div>
            <div className={`${Styles.skillsContainer} contatiner`}>
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={Styles.sillsExpContent}
                >
                    <SkillExperience
                        title="UI / Ux"
                        subtitle="Designer"
                        content={design}
                        icon={<DesignServicesIcon sx={{ fontSize: 45}} />}
                    />
                    <SkillExperience
                        title="Front End"
                        subtitle="Developer"
                        content={developer}
                        icon={<CodeIcon sx={{ fontSize: 50 }} />}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 90 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8 }}
                >
                 <SkillGrid skills={mySkills} />
                </motion.div>
 

            </div>
        </>
    )

}

export default Skills;