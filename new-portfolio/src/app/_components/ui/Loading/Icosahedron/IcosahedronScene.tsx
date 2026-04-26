"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Edges } from '@react-three/drei';
import type { EdgesRef } from '@react-three/drei/core/Edges';
import * as THREE from 'three';

export default function IcosahedronScene() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const lineRef = useRef<EdgesRef | null>(null);
    const matRef = useRef<THREE.MeshPhongMaterial>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // 1. Rotação contínua
        meshRef.current.rotation.y = t * 0.4;
        meshRef.current.rotation.x = t * 0.2;

        // 2. Lógica de Construção Gradativa (Loop de 0 a 1)
        const cycle = (t % 4) / 4; // Um ciclo completo a cada 4 segundos

        // Animação das Faces (Surgem depois das linhas)
        if (matRef.current) {
            // As faces começam a aparecer após 30% do ciclo das linhas
            const faceProgress = THREE.MathUtils.smoothstep(cycle, 0.3, 0.7);
            matRef.current.opacity = faceProgress * 0.8;
        }

        // Animação das Linhas (Construção progressiva)
        const line = lineRef.current;
        if (line) {
            const lineProgress = THREE.MathUtils.smoothstep(cycle, 0, 0.5);
            line.scale.setScalar(0.8 + lineProgress * 0.2);
            line.material.opacity = lineProgress;
        }

        // Reset suave no final do ciclo para o loop recomeçar
        if (cycle > 0.9) {
            const fadeOut = THREE.MathUtils.smoothstep(cycle, 0.9, 1);
            matRef.current.opacity = 0.8 * (1 - fadeOut);
            if (line) {
                line.material.opacity = 1 - fadeOut;
            }
        }
    });

    return (
        <group>
            <Icosahedron args={[1, 0]} ref={meshRef}>
                <meshPhongMaterial
                    ref={matRef}
                    color="#f0f0f0"
                    flatShading={true}
                    transparent
                    opacity={0} // Começa invisível para ser construído
                    shininess={50}
                />

                <Edges
                    ref={lineRef}
                    threshold={15}
                >
                    {/* Material das linhas com suporte a transparência para o fade-in */}
                    <meshBasicMaterial
                        transparent
                        opacity={0}
                        color="#00ffc8"
                        depthTest={true}
                    />
                </Edges>
            </Icosahedron>
        </group>
    );
}
