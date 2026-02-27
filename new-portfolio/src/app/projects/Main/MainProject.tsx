'use client';
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import Image from '@/assets/dog-social.jpeg'

import Post from '../Post/Post';

interface ProjectsProps {
    children?: ReactNode;
}

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
	hidden: { opacity: 0, x: -60 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};


const MainProject = ({ children }: ProjectsProps) => {

	const { refs, page } = useNavigation();

	if (page !== 'projects') return null;
	
	const projectRefs = refs.projects;

    return (
 
        <>	
			<div className="main-layout">
				{children}
				{/* Seção principal */}
				<motion.section 
					id="post"
					ref={projectRefs.post}
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
						className="">

						<Post
							title='Dogs'
							content='Rede Social'
							imageUrl={Image.src}
						/>
	
					</motion.div>
					<motion.div
						className="areaContentRedeSocial">
					</motion.div>
					<motion.div
						variants={slideFromLeftY}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						transition={{ duration: 0.8 }}
						className="area-content-emphasis">

					</motion.div>
				</motion.section>
				
				{/* Sobre mim */}
				<motion.section
					id="about"
					ref={projectRefs.skills}
					variants={slideFromLeftY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					className="area-content-about-me"
				>

				</motion.section>

				{/* Linha do tempo */}
				<motion.section
					id="timeline"
					ref={projectRefs.experience}
					variants={slideFromRightY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					className="area-continer-timeline"
				>

				</motion.section>

				{/* Diferencial */}
				<motion.section
					id="diferencial"
					ref={projectRefs.portfolio}
					variants={slideFromRightY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="area-continer-differential"
				>
				</motion.section>

				{/*-- Contato  */}
				<motion.section
					id="contato"
					ref={projectRefs.posts}
					variants={slideFromLeftY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className="area-continer-contact-me"
					
				>
	
				</motion.section>
				{/*-- Contato  */}
				<motion.section
					id="contato"
					ref={projectRefs.differential}
					variants={slideFromLeftY}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.3 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className="area-continer-contact-me"

				>

				</motion.section>
			</div>
		</>
    );
}
export default MainProject;