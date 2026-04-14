interface itemContent {
    title?: string;
    progess?: number;
    iconStask?: ReactNode;
}

export interface AccordionProps {
    icon?: ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    content: itemContent[];
};