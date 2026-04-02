import Styles from './Skeleton.module.css';

interface SkeletonProps {
    width?: string;
    height?: string;
    variant?: 'circular' | 'rectangular';
    borderRadius?: string;
}

export default function Skeleton({
    width = '100%',
    height = '20px',
    variant = 'rectangular',
    borderRadius
}: SkeletonProps) {
    return (
        <div
            className={`${Styles.skeleton} ${Styles[variant]}`}
            style={{
                width,
                height,
                borderRadius: borderRadius
            }}
        />
    );
}
