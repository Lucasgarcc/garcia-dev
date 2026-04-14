'use client';

import styles from './TechnicalLevel.module.css';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import Accordion from '@/app/components/ui/Accordion/Accordion';
import { BsFiletypeHtml } from "react-icons/bs";
import { BsFiletypeScss } from "react-icons/bs";


import { FaNodeJs } from "react-icons/fa";
import { RiNpmjsLine } from "react-icons/ri";
import { SiPostgresql } from "react-icons/si";
import { PiFileSql } from "react-icons/pi";

import CodeIcon from '@mui/icons-material/Code';
import { GrNetworkDrive } from "react-icons/gr";

import { RiJavascriptLine } from "react-icons/ri";
import { TbBrandAngular } from "react-icons/tb";
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandTypescript } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { RiFigmaFill } from "react-icons/ri";
import { IoIosGitBranch } from "react-icons/io";

const frontEnd = [
    {
        title: 'HTML',
        progess: 100, // Seguindo o typo 'progess' da sua interface
        iconStask: <BsFiletypeHtml className={styles.icon} />
    },
    {
        title: 'CSS / SASS',
        progess: 95,
        iconStask: <BsFiletypeScss className={styles.icon} />
    },
    {
        title: 'JavaScript',
        progess: 90,
        iconStask: <RiJavascriptLine className={styles.icon} />
    },
    {
        title: 'TypeScript',
        progess: 85,
        iconStask: <TbBrandTypescript className={styles.icon} />
    },
    {
        title: 'React / Next.js',
        progess: 85,
        iconStask: <RiReactjsLine className={styles.icon} />
    },
    {
        title: 'Angular / AngularJS',
        progess: 90,
        iconStask: <TbBrandAngular className={styles.icon} />
    },
    {
        title: 'Styled Components / Tailwind',
        progess: 70,
        iconStask: <RiTailwindCssFill className={styles.icon} />
    },
    {
        title: 'Motion Framer',
        progess: 50,
        iconStask: <TbBrandFramerMotion className={styles.icon} />
    },
    {
        title: 'Git / Git Flow',
        progess: 80,
        iconStask: <IoIosGitBranch className={styles.icon} />
    }
];


const backEnd = [
    {
        title: 'Node',
        progess: 50, // Seguindo o typo 'progess' da sua interface
        iconStask: <FaNodeJs className={styles.icon} />
    },
    {
        title: 'SQL',
        progess: 50,
        iconStask: <PiFileSql  className={styles.icon} />
    },
    {
        title: 'Postgresql',
        progess: 40,
        iconStask: <SiPostgresql 
            strokeWidth={.6} // Aumente este valor para engrossar
            stroke="currentColor" className={styles.icon} 
        />
    },
    {
        title: 'npm',
        progess: 60,
        iconStask: <RiNpmjsLine className={styles.icon} />
    },
    
];


const TechnicalLevel = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 90 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography
                    className={styles.TchnicalTitle}
                    textTransform={'uppercase'}
                    variant="h4"
                    align='center'
                    textAlign={'center'}
                    fontFamily='var(--font-title)'
                    gutterBottom
                    fontWeight={500}
                    zIndex={1000}
                >
                    Nível Técnico
                </Typography>
            
            </motion.div>   
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`${styles.technicalContainer} contatiner`}
                >

                <Accordion title="Front End Developer" 
                    icon={<CodeIcon />} 
                    content={frontEnd} 
                />
                
                    <Accordion title="Back End Developer"
                        icon={<GrNetworkDrive fontSize={'21'} />}
                        content={backEnd}
                />
  
            </motion.div>
   
        </>
    )
};

export default TechnicalLevel;