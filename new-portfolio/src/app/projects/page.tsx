'use client';
import MainProjects from './components/MainProject';
// Importe o Provider do caminho correto onde você o criou
import { ProjectsSelectionProvider } from './components/Projects/context/ProjectsSelectionContext';
import gitProjects from './components/Projects/data/gitProjects';

export default function ProjectsPage() {
    return (
        <ProjectsSelectionProvider projects={gitProjects}>
            <MainProjects />
        </ProjectsSelectionProvider>
    );
}