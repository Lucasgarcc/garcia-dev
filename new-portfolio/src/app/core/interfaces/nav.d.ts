import { ReactNode } from 'react';

export interface NavItem {
    type: string;
    page: string;
    id: string;
    label: string;
    href: string;
    icon?: ReactNode;
    underline?: boolean;
    active?: boolean;
}
