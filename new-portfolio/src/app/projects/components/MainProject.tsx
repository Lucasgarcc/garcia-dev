'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/core/context/NavigationContext';
import Post from './Post/Post';
import Skills from './Skills/Skils';
import TechnicalLevel from './TechnicalLevel/TechnicalLevel';
import Articles from './Articles/Articles';
import Projects from './Projects/Projects';
import gitProjects from './Projects/data/gitProjects';
import { useLanguage } from '@/app/core/context/LanguageContext';
interface ProjectsProps {
    children?: ReactNode;
}

const project = gitProjects.find(p => p.id === 'Dogs Social');

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
    const { t } = useLanguage();

    if (page !== 'projects') return null;

    const projectRefs = refs.projects;
    const featuredProject = project ? t.projectItems[project.id as keyof typeof t.projectItems] : undefined;

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
                            
                       {project && ( 
                            <Post
                                title={featuredProject?.title ?? project.id}
                                content={featuredProject?.description ?? project.subDescription}
                                imageUrl='/assets/dog-social.jpeg'
                                deploy={project.deployUrl}
                                github={project.repoUrl}
                            />
                       )}
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

                    <Articles />
                </motion.section>

                {/* Projetos */}
                <motion.section
                    id="portfolio"
                    ref={projectRefs.portfolio}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="area-container-projects"
                >
                    <Projects />
                </motion.section>

            </div>
        </div>
    );
}
export default MainProject;
