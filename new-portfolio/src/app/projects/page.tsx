'use client';
import dynamic from 'next/dynamic';
// Importe o Provider do caminho correto onde você o criou
import { ProjectsSelectionProvider } from './components/Projects/context/ProjectsSelectionContext';
import gitProjects from './components/Projects/data/gitProjects';

const MainProjects = dynamic(() => import('./components/MainProject'), {
    ssr: false,
});

export default function ProjectsPage() {
    return (
        <ProjectsSelectionProvider projects={gitProjects}>
            <MainProjects />
        </ProjectsSelectionProvider>
    );
}
