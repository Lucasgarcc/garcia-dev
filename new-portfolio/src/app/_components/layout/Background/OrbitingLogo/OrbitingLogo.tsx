'use client';
import { forwardRef } from 'react';
import type { ComponentType, SVGProps } from 'react';
import Styles from './OrbitingLogo.module.css';

interface OrbitingLogoProps {
    logo: ComponentType<SVGProps<SVGSVGElement>>;
}

const OrbitingLogo = forwardRef<HTMLDivElement, OrbitingLogoProps>(function OrbitingLogo({ logo }, ref) {
    const Logo = logo;

    return (
        <div
            ref={ref}
            className={Styles.logoContainer}
        >
            <Logo
                className={Styles.logo}
                aria-hidden="true"
                focusable="false"
            />
        </div>
    );
});

export default OrbitingLogo;
