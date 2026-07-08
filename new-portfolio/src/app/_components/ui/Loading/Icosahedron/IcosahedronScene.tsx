"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function IcosahedronScene() {
    const groupRef = useRef<THREE.Group>(null!);
    const lineGeomRef = useRef<THREE.BufferGeometry>(null!);
    const matRef = useRef<THREE.MeshPhongMaterial>(null!);
    const lineMatRef = useRef<THREE.LineBasicMaterial>(null!);

    const startTimeRef = useRef<number | null>(null);

    // Geramos as geometrias base de forma isolada
    const { faceGeometry, edgeGeometry } = useMemo(() => {
        const faces = new THREE.IcosahedronGeometry(1, 0);
        const edges = new THREE.EdgesGeometry(faces, 15);
        return { faceGeometry: faces, edgeGeometry: edges };
    }, []);

    const totalLinesCount = edgeGeometry.attributes.position.count;

    useEffect(() => {
    
        if (lineGeomRef.current) {
            lineGeomRef.current.setDrawRange(0, 0);
        }

        const rootStyle = getComputedStyle(document.documentElement);
        const cssColor = rootStyle.getPropertyValue('--surface-five').trim();

        if (cssColor) {
            const threeColor = new THREE.Color(cssColor);
            if (lineMatRef.current) lineMatRef.current.color = threeColor;
            if (matRef.current) matRef.current.color = threeColor;
        }
    }, []);

    useFrame((state) => {
        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.getElapsedTime();
        }

        const localTime = state.clock.getElapsedTime() - startTimeRef.current;

        // Rotação infinita e constante
        if (groupRef.current) {
            groupRef.current.rotation.y = localTime * 0.4;
            groupRef.current.rotation.x = localTime * 0.2;
        }

        // Animação linear de 3 segundos de duração
        const animationTime = Math.min(localTime, 3);
        const progress = animationTime / 3;

        // CONSTRUÇÃO DO VETOR 
        if (lineGeomRef.current) {
            const lineProgress = THREE.MathUtils.smoothstep(progress, 0, 0.7);
            const currentDrawCount = Math.floor(lineProgress * totalLinesCount);

            lineGeomRef.current.setDrawRange(0, currentDrawCount);
        }

        // APARECIMENTO DAS FACES
        if (matRef.current) {
            const faceProgress = THREE.MathUtils.smoothstep(progress, 0.4, 1);
            matRef.current.opacity = faceProgress * 0.35;
        }

        if (lineMatRef.current) {
            lineMatRef.current.opacity = 1;
        }
    });

    return (
        <group ref={groupRef}>
            <lineSegments>
                <bufferGeometry
                    ref={lineGeomRef}
                    attach="geometry"
                    index={edgeGeometry.index}
                    attributes={edgeGeometry.attributes}
                />
                <lineBasicMaterial
                    ref={lineMatRef}
                    transparent
                    opacity={1}
                    depthTest={true}
                />
            </lineSegments>

            <mesh geometry={faceGeometry}>
                <meshPhongMaterial
                    ref={matRef}
                    flatShading={true}
                    transparent
                    opacity={0}
                    shininess={100}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}