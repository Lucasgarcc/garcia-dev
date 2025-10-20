'client'
import '../../../globals.css'
import React from 'react';
import { Typography} from '@mui/material';
import { motion } from 'framer-motion';
import Styles from './AboutMe.module.css';
import Statistics from './Statistics/Statistics';
import CodeCard from './Statistics/CodeCard/CodeCard';
import ViableResume from './ViableResume/ViableResume';

const AboutMe = ( ) => {
    return (
    
        <>  
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                <Typography marginTop={20} color='var(--primary-c-2)' textTransform={'uppercase'} 
                variant="h4" className={Styles.title} marginBottom={10} textAlign={'center'} fontFamily='var(--font-title)' gutterBottom fontWeight={450}>
                    Sobre Mim
                </Typography>      
                <div className={Styles.aboutMeContainer}>
                    <div className={Styles.aboutContentText}>
        
                        <Typography className={Styles.aboutContentDescription} variant="body1" marginTop={2} maxWidth={'100%'}  textAlign={'justify'}>
                           Desenvolvedor Web e criador de experiências digitais que unem design, propósito e tecnologia.
                            Trabalho com foco em Frontend e UI/UX Design, desenvolvendo interfaces que conectam pessoas e ideias.
                            Acredito que cada projeto é uma oportunidade de evoluir — técnica e pessoalmente — e sigo construindo minha trajetória com curiosidade, resiliência e vontade de ir além.
                            Meu objetivo é crescer como Desenvolvedor Frontend Pleno e, no futuro, expandir meus horizontes como Full Stack, sempre mantendo o olhar criativo e a busca pela excelência em cada detalhe.
                        </Typography>

                        <div className={Styles.aboutContentStatis}>
                            <Statistics />
                        </div>
                        <div className={Styles.aboutContentButton}>
                            <ViableResume />
                        </div>
      
                        <CodeCard />
                     

                    </div>
          

                </div>     
            </motion.div>
        </>
        
    );
};

export default AboutMe;