'use client';

import React, { createContext, useState, ReactNode, useCallback } from 'react';

interface ProjectsSelectionContextType {
    selectedProjectId: string | null;
    hoveredProjectId: string | null;
    setSelectedProject: (id: string | null) => void;
    setHoveredProject: (id: string | null) => void;
}

export const ProjectsSelectionContext = createContext<ProjectsSelectionContextType | undefined>(undefined);

export const ProjectsSelectionProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

    const handleSelectProject = useCallback((id: string | null) => {
        setSelectedProjectId(id);
    }, []);

    const handleHoverProject = useCallback((id: string | null) => {
        setHoveredProjectId(id);
    }, []);

    return (
        <ProjectsSelectionContext.Provider
            value={{
                selectedProjectId,
                hoveredProjectId,
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
