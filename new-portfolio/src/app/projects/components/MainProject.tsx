'use client';
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/core/context/NavigationContext';
import Post from './Post/Post';
import Skills from './Skills/Skils';
import TechnicalLevel from './TechnicalLevel/TechnicalLevel';
import Articles from './Articles/Articles';

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

const MainProject = ({ children }: ProjectsProps) => {

    const { refs, page } = useNavigation();

    if (page !== 'projects') return null;

    const projectRefs = refs.projects;

    return (

        <div className="project-container">
            <div className="project-content">
                {children}
                {/* Seção principal */}
                <motion.section
                    id="post"
                    ref={projectRefs.post}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="area-container-post"
                >

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4 }}
                        className="contatiner">

                        <Post
                            title='Dogs Social'
                            content='Projeto de rede social para amantes de cães, onde os usuários podem criar perfis para seus pets, compartilhar fotos, histórias e interagir com outros donos de cães. O objetivo é criar uma comunidade online para entusiastas de cães se conectarem, compartilharem experiências e celebrarem o amor pelos seus amigos peludos.'
                            imageUrl='/assets/dog-social.jpeg'
                        />

                    </motion.div>

                </motion.section>

                {/* Skills */}
                <motion.section
                    id="skills"
                    ref={projectRefs.skills}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="area-container-skills"
                >
                    <Skills />
                </motion.section>

                {/* Nível Técnico */}
                <motion.section
                    id="technicalLevel"
                    ref={projectRefs.technicalLevel}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    className="area-container-technicalLevel"
                >
                    <TechnicalLevel />
                </motion.section>

                {/* Artigos */}
                <motion.section
                    id="articles"
                    ref={projectRefs.articles}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="area-container-articles"

                >
                    {/*
                        <Link href={`/articles/${posts[0].slug}`} scroll={false}>
                            <Button>
                                Ler Artigo completo
                            </Button>
                        </Link> 
                    */}
                        <Articles />
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
                    className="area-container-differential"

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
                    className="area-container-contact-me"

                >

                </motion.section>
            </div>
        </div>
    );
}
export default MainProject;
