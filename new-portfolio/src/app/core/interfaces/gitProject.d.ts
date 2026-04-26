/**
 * Interface que define a estrutura de um projeto no ecossistema "Git Graph"
 * Focada em metadados de engenharia e navegação de profundidade.
 */
export interface GitProject {
    id: string;             // Identificador único (ex: 'flux-framework')
    title: string;          // Nome do projeto
    description: string;    // Breve resumo focado no problema resolvido

    // Metadados Estilo Git
    branch: string; // Nome da ramificação (ex: 'feature/vanilla-logic')
    colorBranch?: string; // Cor personalizada para a linha do projeto (opcional)
    commitHash?: string;    // Hash simulado (ex: 'a1b2c3d')
    order: number;          // Ordem cronológica para o cálculo de profundidade Z

    // Links e Referências
    tags: string[];         // Tecnologias e conceitos (ex: ['JS', 'Design Patterns'])
    slug: string;           // Slug para buscar o conteúdo Markdown do artigo
    githubUrl: string;      // Link do repositório
    deployUrl?: string;     // Link opcional da aplicação rodando (Vercel/Nginx)

    // Visual
    image?: string;         // Caminho da imagem de preview ou diagrama técnico
    status: 'completed' | 'in-progress' | 'archived'; // Estado atual do projeto
}