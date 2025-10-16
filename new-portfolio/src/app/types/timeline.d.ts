export interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

export interface TimelineData {
    Cursos: TimelineItem[];
    Experiencias: TimelineItem[];
}