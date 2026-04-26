'use client';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Styles from './OrbitingLogo.module.css';

interface OrbitingLogoProps {
    logo: StaticImageData;
    index: number;
    time: number;
    radius: number;
    logosLength: number;
}

export default function OrbitingLogo({
    logo,
    index,
    time,
    radius,
    logosLength
}: OrbitingLogoProps) {
    const angle = (index / logosLength) * Math.PI * 2.5 + time * 0.5;
    const yAngle = Math.sin(time + index) * 0.5;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(yAngle) * radius * 0.5;
    const z = Math.sin(angle) * radius;

    return (
        <motion.div
            className={Styles.logoContainer}
            style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
            }}
        >
            <Image
                className={Styles.logo}
                src={logo}
                alt="Logo"
                width={50}
                height={50}
                loading="lazy"
                style={{ objectFit: 'contain' }}
            />
        </motion.div>
    );
}
