import { ReactNode } from "react";

export interface link{
    id: string;
    href: string;
    children: ReactNode;
    underline: boolean;
    icon: ReactNode;
    active: boolean
};