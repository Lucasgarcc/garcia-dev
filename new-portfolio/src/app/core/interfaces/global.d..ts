declare module '*.module.css';
declare module '*.module.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.svg?url' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module '*.md' {
    const content: string;
    export default content;
}

// No seu arquivo de definições (.d.ts)
declare module 'react-markdown';
declare module 'remark-gfm';