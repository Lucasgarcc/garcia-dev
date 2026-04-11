'use client';

import React from "react";
import Styles from './Skills.module.css';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import SkillGrid from "./SkilGrid/SkillGrid";
import { RiReactjsLine } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiNodejsLine } from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiFigmaFill } from "react-icons/ri";
import { FaGitAlt } from "react-icons/fa6";
import { Skill } from "@/app/core/interfaces/skill";

const mySkills: Omit<Skill, 'id'>[]= [

    { name: 'React', icon: <RiReactjsLine />, shadowColor: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />, shadowColor: '#3178C6' },
    { name: 'Next.js', icon: <RiNextjsFill />, shadowColor: '#ffffff' },
    { name: 'Tailwind', icon: <RiTailwindCssFill />, shadowColor: '#06B6D4' },
    { name: 'Node.js', icon: <RiNodejsLine />, shadowColor: '#339933' },
    { name: 'Motion Frame', icon: <TbBrandFramerMotion />, shadowColor: '#f0f0f0' },
    { name: 'Figma', icon: <RiFigmaFill />, shadowColor: '#03ffc8' },
    { name: 'Git', icon: <FaGitAlt />, shadowColor: '#ff4824' },
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
            <motion.div
                className={`${Styles.skillsContainer} contatiner`}
            >
                <SkillGrid skills={mySkills}/>
            </motion.div>
        </>
    )

}

export default Skills;