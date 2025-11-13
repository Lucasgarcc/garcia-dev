import { ReactNode } from 'react';

export interface NavItem {
    id: string;
    label: string;
    href: string;
    underline?: boolean;
    active?: boollen;
}