'use client';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Styles from './ProfileCard.module.css';


interface ProfileCardProps {
    image: StaticImageData;
    alt: string;
}

export default function ProfileCard({ image, alt }: ProfileCardProps) {
    return (
        <motion.div
            className={Styles.profileWrapper}
            animate={{
                rotate: [0, 5, -5, 0],
                y: [0, 5, 0],
                x: [0, 9, 0]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <Image
                src={image}
                className={Styles.profile}
                alt={alt}
                priority
                sizes="(max-width: 768px) 90vw, 600px"
                placeholder="blur"
            />
        </motion.div>
    );
}
