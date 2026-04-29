'use client';

import { GitProject, ProjectsSelectionContextType } from '@/app/core/interfaces/gitProject';
import React, { createContext, useState, ReactNode, useCallback } from 'react';

export const ProjectsSelectionContext = createContext<ProjectsSelectionContextType | undefined>(undefined);


// No Provider, você recebe a lista de projetos como prop
export const ProjectsSelectionProvider = ({
    children,
    projects
}: {
    children: ReactNode;
    projects: GitProject[]
}) => {
    const [selectedProject, setSelectedProjectId] = useState<string | null>(null);
    const [hoveredProject, setHoveredProjectId] = useState<string | null>(null);
    const [isMode3D, setIsMode3D] = useState(false);
    // Derivamos o objeto completo automaticamente quando o ID muda
    const selectedProjectData = projects?.find(p => p.id === selectedProject) || null;

    const handleSelectProject = useCallback((id: string | null) => {
        setSelectedProjectId(id);
        if (id) setIsMode3D(true);
    }, []);

    const handleHoverProject = useCallback((id: string | null) => {
        setHoveredProjectId(id);
    }, []);

    return (
        <ProjectsSelectionContext.Provider
            value={{
                selectedProject: selectedProject,
                selectedProjectData,
                isMode3D,
                setIsMode3D, // Agora o pai tem acesso a tudo
                hoveredProject,
                setSelectedProject: handleSelectProject,
                setHoveredProject: handleHoverProject,
            }}
        >
            {children}
        </ProjectsSelectionContext.Provider>
    );
};

export const useProjectsSelection = () => {
    const context = React.useContext(ProjectsSelectionContext);
    if (!context) {
        throw new Error('useProjectsSelection deve ser usado dentro de ProjectsSelectionProvider');
    }
    return context;
};
