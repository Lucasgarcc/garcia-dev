'client'
import '../../../globals.css'
import React from 'react';
import { Typography} from '@mui/material';
import { motion } from 'framer-motion';
import Styles from './AboutMe.module.css';

const AboutMe = ( ) => {
    return (
    
        <>  
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <Typography marginTop={10} color='var(--primary-c-2)' textTransform={'uppercase'} 
                variant="h4" className={Styles.title} textAlign={'center'} fontFamily='var(--font-title)' gutterBottom fontWeight={450}>
                    Sobre Mim
                </Typography>      
                <div className={Styles.aboutMeContainer}>
                    <div className={Styles.aboutContentText}>
        
                    <Typography variant="body1" marginTop={2} maxWidth={'100%'}  textAlign={'justify'}>
                        Desenvolvedor Web, com amplo conhecimento e alguns anos de experiência, atuando em tecnologias web Frontend e UI/UX design, desenvolvendo projetosde qualidade. Valorizo o conhecimento, a capacidade de aprender algo novo todos os dias, com entusiasmo e entusiasmo e muita resiliência, olharpara o futuro com a mente aberta a qualquer desafio e oportunidade que surja na minha jornada...
                    </Typography>
                </div>
                <figure className={Styles.aboutContentImage}>
                </figure>
                </div>     
            </motion.div>
        </>
        
    );
};

export default AboutMe;