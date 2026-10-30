"use client";

import styles from './LoadingTech.module.css';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import IcosahedronScene from './Icosahedron/IcosahedronScene';

const LoadingTech = () => {
    return (
        <div
            className={styles.overlay}
            style={{ background: 'transparent' }}
        >
            <div className={styles.sceneContainer}>
                {/* O Canvas é a janela para o mundo 3D */}
                <Canvas
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    gl={{ alpha: true, antialias: true }}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                >
                    {/* Iluminação para dar o volume 3D real */}
                    <ambientLight intensity={0.5} />
                    {/* Luz direcional para criar o contraste entre as faces */}
                    <directionalLight position={[10, 10, 5]} intensity={1.5} />

                    <Suspense fallback={null}>
                        <IcosahedronScene />
                    </Suspense>
                </Canvas>

                <div className={styles.uiContainer}>
                    <p className={styles.text} aria-label="Carregando">
                        Carregando
                        <span className={styles.dots} aria-hidden="true">
                            <span className={styles.dot}>.</span>
                            <span className={styles.dot}>.</span>
                            <span className={styles.dot}>.</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingTech;
