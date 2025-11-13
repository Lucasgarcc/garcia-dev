'use client';
import '../../../globals.css';
import { ReactNode } from 'react';
import { animate, motion } from 'framer-motion';
import Emphasis from '@/app/components/Home/Emphasis/Emphasis';
import RedeSocial from '@/app/components/Home/Emphasis/RedeSocial/RedeSocial';
import Scene3D from '@/app/components/Background/Scene3D';
import AboutMe from '../AboutMe/AboutMe';
import MouseRole from '../MouseRole/MouseRole';
import Timeline from '../Timeline/Timeline';
import Differential from '../Differential/Differential';
import Footer from '../../Footer/Footer';
import ContactMe from '../../ContactMe/ContactMe';
import { Menu } from '@mui/material';
import { useNavigation } from '@/hooks/context/NavigationContext';
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

const slideFromLeft = {
	hidden: { opacity: 0, x: -60},
	visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' }},
};

const slideFromRight = {
	hidden: { opacity: 0, x: 60 },
	visible: { opacity: 1, x: 0, transition: {duration: 0.8, ease: 'easeOut'} },
};

const MainLayout = ({ children }: MainLayoutProps) => {

 	const { refs } = useNavigation();

	return (
		<>	
			<main className="main-layout">
				{children}
				{/* Seção principal */}
				<motion.section 
					ref={refs.intro}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="main-content"
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
						variants={slideFromRight}
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
					ref={refs.about}
					variants={slideFromLeftY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					className="area-content-about-me"
					id='about'
				>
					<AboutMe />
				</motion.section>

				{/* Linha do tempo */}
				<motion.section
					ref={refs.timeline}
					variants={slideFromRightY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					className="area-continer-timeline"
					id='timeline'
				>
					<Timeline />
				</motion.section>

				{/* Diferencial */}
				<motion.section
					ref={refs.diferencial}
					variants={slideFromLeftY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="area-continer-differential"
					id='diferencial'
				>
					<Differential />
				</motion.section>

				{/*-- Contato  */}
				<motion.section
					ref={refs.contato}
					variants={slideFromRight}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className="area-continer-contact-me"
					id='contato'
				>
					<ContactMe />
				</motion.section>
			</main>
			<Footer />
		</>
	);
};
export default MainLayout;
