/**
 * Interface que define a estrutura de um projeto no ecossistema "Git Graph"
 * Focada em metadados de engenharia e navegação de profundidade.
 */
export interface GitProject {
    id: string;             // Identificador único (ex: 'flux-framework')
    title: string;          // Nome do projeto
    description: string;    // Breve resumo focado no problema resolvido
    subDescription?: string;
    // Metadados Estilo Git
    branch: string; // Nome da ramificação (ex: 'feature/vanilla-logic')
    colorBranch: string; // Cor personalizada para a linha do projeto (opcional)
    commitHash?: string;    // Hash simulado (ex: 'a1b2c3d')
    order: number;          // Ordem cronológica para o cálculo de profundidade Z

    // Links e Referências
    tags: string[];         // Tecnologias e conceitos (ex: ['JS', 'Design Patterns'])
    slug: string;           // Slug para buscar o conteúdo Markdown do artigo
    repoUrl: string;      // Link do repositório
    deployUrl?: string;     // Link opcional da aplicação rodando (Vercel/Nginx)

    // Visual
    image?: string;         // Caminho da imagem de preview ou diagrama técnico
    status: 'completed' | 'in-progress' | 'archived'; // Estado atual do projeto
}
// Interface simplificada para o objeto Illustration do Zdog

export interface ZdogIllustration {
    rotate: { x: number; y: number; z: number };
    translate: { x: number; y: number; z: number };
    zoom: number;
    updateRenderGraph: () => void;
}

// Interface para o motor de iluminação
export interface LightingNode {
    shape: {
        color: string;
        // Se precisar de mais propriedades no futuro, adicione aqui
    };
    baseColor: string;
    highlightColor: string;
}

// Iterface Provider de Context 
export interface ProjectsSelectionContextType {
    selectedProject: string | null;
    selectedProjectData: GitProject | null; 
    isMode3D: boolean; 
    setIsMode3D: (active: boolean) => void; 
    isCardOpen: boolean;
    setIsCardOpen: (active: boolean) => void; 
    setSelectedProject: (id: string | null) => void; 
    hoveredProject: string | null;
    setSelectedProject: (id: string | null) => void;
    setHoveredProject: (id: string | null) => void;
}
