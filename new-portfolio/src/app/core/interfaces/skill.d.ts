import { ReactNode } from 'react';

export interface Skill {
  id?: string | number;
  name: string;
  icon: ReactNode;
  /** Cor em HEX, RGB ou HSL que será usada no glow e na borda */
  shadowColor: string;
  /** Opcional: para categorias como 'frontend', 'backend', etc */
  category?: 'frontend' | 'backend' | 'tools' | 'design';
}

/** Props para o componente individual */
export interface SkillIconProps extends Omit<Skill, 'id'> {
  className?: string;
}

/** Props para o container que mapeia a lista */
export interface SkillGridProps {
  skills: Skill[];
  title?: string;
}