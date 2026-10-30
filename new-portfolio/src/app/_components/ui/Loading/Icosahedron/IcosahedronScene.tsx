"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import useMediaQuery from '@/app/core/hooks/MediaQuery/MediQuery';
import * as THREE from 'three';

const IcosahedronScene = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Define o tamanho responsivo (1 para desktop, 0.65 para mobile)
    const currentScale = isMobile ? 0.50 : 0.75;

    const groupRef = useRef<THREE.Group>(null!);
    const lineGeomRef = useRef<THREE.BufferGeometry>(null!);
    const matRef = useRef<THREE.MeshPhongMaterial>(null!);
    const lineMatRef = useRef<THREE.LineBasicMaterial>(null!);
    const vertexMatRef = useRef<THREE.PointsMaterial>(null!);

    const startTimeRef = useRef<number | null>(null);

    // Geramos as geometrias base de forma isolada
    const { faceGeometry, edgeGeometry, vertexGeometry } = useMemo(() => {
        const faces = new THREE.IcosahedronGeometry(1, 0);
        const edges = new THREE.EdgesGeometry(faces, 15);
        const position = faces.getAttribute('position');
        const vertices: number[] = [];
        const seen = new Set<string>();

        for (let index = 0; index < position.count; index += 1) {
            const vertex = new THREE.Vector3().fromBufferAttribute(position, index);
            const key = [vertex.x.toFixed(5), vertex.y.toFixed(5), vertex.z.toFixed(5)].join(':');

            if (!seen.has(key)) {
                seen.add(key);
                vertices.push(vertex.x, vertex.y, vertex.z);
            }
        }

        const points = new THREE.BufferGeometry();
        points.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        return { faceGeometry: faces, edgeGeometry: edges, vertexGeometry: points };
    }, []);

    const totalLinesCount = edgeGeometry.attributes.position.count;

    // zera o drawRange antes mesmo do primeiro frame ir para a tela.
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

        const greenColor = rootStyle.getPropertyValue('--green-500').trim();
        if (greenColor && vertexMatRef.current) {
            vertexMatRef.current.color = new THREE.Color(greenColor);
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

        if (vertexMatRef.current) {
            vertexMatRef.current.opacity = THREE.MathUtils.smoothstep(progress, 0.05, 0.55);
        }
    });

    return (
        <group ref={groupRef} scale={currentScale}>
            <lineSegments>
                <primitive object={edgeGeometry} ref={lineGeomRef} attach="geometry" />
                <lineBasicMaterial
                    ref={lineMatRef}
                    transparent
                    opacity={1}
                    depthTest={true}
                />
            </lineSegments>

            <points geometry={vertexGeometry}>
                <pointsMaterial
                    ref={vertexMatRef}
                    color="#91bf27"
                    size={isMobile ? 0.075 : 0.09}
                    sizeAttenuation
                    transparent
                    opacity={0}
                    depthTest
                />
            </points>

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
};

export default IcosahedronScene;
