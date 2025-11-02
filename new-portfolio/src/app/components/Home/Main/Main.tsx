'use client';

import '../../../globals.css';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import Emphasis from '@/app/components/Home/Emphasis/Emphasis';
import RedeSocial from '@/app/components/Home/Emphasis/RedeSocial/RedeSocial';
import Scene3D from '@/app/components/Background/Scene3D';
import useViewAnimation from '@/hooks/EffectAnimation/EffectAnimation';
import AboutMe from '../AboutMe/AboutMe';
import MouseRole from '../MouseRole/MouseRole';
import Timeline from '../Timeline/Timeline';
import Differential from '../Differential/Differential';
import Footer from '../../Footer/Footer';

interface MainLayoutProps {
  children?: ReactNode;
}

// Variantes para seções que entram da esquerda
const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

// Variantes para seções que entram da direita
const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <main className="main-layout">
        {children}

        {/* Seção principal */}
        <motion.section
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="main-content">
            
            <motion.div
                variants={slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}  
                className="area-content-scene3D">
                <Scene3D />
                
            </motion.div>

            <motion.div
                variants={slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}   
                className="areaContentRedeSocial">

                <RedeSocial redesocial={{ className: '', fontSize: 0 }} />
            </motion.div>
            <motion.div
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}  
                className="area-content-emphasis">

                <Emphasis />
                <MouseRole />
            </motion.div>
        </motion.section>

        {/* Sobre mim */}
        <motion.section
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="area-content-about-me"
        >
          <AboutMe />
        </motion.section>

        {/* Linha do tempo */}
        <motion.section
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
    
          transition={{ duration: 0.8, delay: 0.3 }}
          className="area-continer-timeline"
        >
          <Timeline />
        </motion.section>

        {/* Diferencial */}
        <motion.section
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="area-continer-differential"
        >
          <Differential />
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
