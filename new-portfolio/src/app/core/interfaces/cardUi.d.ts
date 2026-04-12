
export interface ContentItem {
    text?: string;
}

export interface CardUi {
    title: string;
    subtitle?: string;
    className?: string;
    icon?: ReactNode;
    content: ContentItem[]; // Array de objetos do tipo ContentItem
    onClose?: MouseEventHandler<T>;
}