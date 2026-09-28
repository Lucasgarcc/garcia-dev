'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Emphasis from './components/Emphasis/Emphasis';
import AboutMe from './components/AboutMe/AboutMe';
import MouseRole from './components/MouseRole/MouseRole';
import Timeline from './components/Timeline/Timeline';
import Differential from './components/Differential/Differential';
import { useNavigation } from '@/core/context/NavigationContext';
import dynamic from 'next/dynamic';
import Skeleton from '../_components/ui/Skeleton/Skeleton';

const Scene3D = dynamic(() => import('../_components/layout/Background/Scene3D'), {
    ssr: false,
    loading: () => <Skeleton width="100vw" height="100vh" />

});
const RedeSocial = dynamic(() => import('./components/Emphasis/RedeSocial/RedeSocial'), {
    ssr: false,
    loading: () => <Skeleton width="80%" height="auto" />

});
const ContactMe = dynamic(() => import('../_components/ContactMe/ContactMe'), {
    ssr: false,
    loading: () => <Skeleton width="100%" height="auto" />

});

interface MainLayoutProps {
    children?: ReactNode;
}
// Variantes para seções que entram da esquerda
const slideFromLeftY = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
};
// Variantes para seções que entram da direita
const slideFromRightY = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
};


const MainLayout = ({ children }: MainLayoutProps) => {

    const { refs, page } = useNavigation();

    if (page !== 'home') return null;

    const homeRefs = refs.home;
    console.log('Home Refs:', homeRefs);
    return (
        <>
            <main className="main-layout">
                {children}

                {/* Seção principal */}
                <motion.section
                    id="intro"
                    ref={homeRefs.intro}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="intro-content"
                >
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                        className="area-content-scene3D">
                        <Scene3D />
                    </motion.div>
                    <motion.div
                        className="areaContentRedeSocial">
                        <RedeSocial redesocial={{ className: '', fontSize: 0 }} />
                    </motion.div>
                    <motion.div
                        variants={slideFromLeftY}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="area-content-emphasis">
                        <Emphasis />
                        <MouseRole />
                    </motion.div>
                </motion.section>

                {/* Sobre mim */}
                <motion.section
                    id="about"
                    ref={homeRefs.about}
                    className="area-content-about-me"
                >
                    <AboutMe />
                </motion.section>

                {/* Linha do tempo */}
                <motion.section
                    id="timeline"
                    ref={homeRefs.timeline}
                    variants={slideFromRightY}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="area-container-timeline"
                >
                    <Timeline />
                </motion.section>

                {/* Diferencial */}
                <motion.section
                    id="differential"
                    ref={homeRefs.differential}
                    variants={slideFromRightY}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="area-container-differential"
                >
                    <Differential />
                </motion.section>

                {/*-- Contato  */}
                <motion.section
                    id="contact"
                    ref={homeRefs.contact}
                    variants={slideFromLeftY}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="area-container-contact-me"

                >
                    <ContactMe />
                </motion.section>
            </main>
        </>
    );
};
export default MainLayout;
