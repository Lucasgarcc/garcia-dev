'use client';
import React, { useRef, useEffect, useState } from 'react';
import Zdog from 'zdog';
import gsap from 'gsap';
import gitProjects from '../data/gitProjects';
import { useProjectsSelection } from '../context/ProjectsSelectionContext';
import styles from './GitGraph.module.css';
import useMediaQuery from '@/core/hooks/MediaQuery/MediQuery';

const COLORS = {
    main: '#378CE7',
    line: '#378CE7',//'var(--bg-blue)'
    text: '#ffffff'
};

let isZfontInitialized = false;

const GitGraph = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { selectedProjectId, setSelectedProject } = useProjectsSelection();

    // Refs para persistência de estado sem re-render
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const illoRef = useRef<Zdog.Illustration | null>(null);
    const isInteractingRef = useRef(false);
    const isZoomedRef = useRef(false);
    const lastInteractionTimeRef = useRef(Date.now());

    let spacingY = (selectedProjectId ? 260 : isMobile ? 260 : 200); //210 - selectedP.3D com 8 projects
    const centerX = 250;
    let branchOffset = selectedProjectId ? 250 : 250;
    const totalHeight = (selectedProjectId ? gitProjects.length + 1 : gitProjects.length + 1.7) * spacingY;

    isMobile ? (branchOffset = 250) && (spacingY = 270) : branchOffset = 230;

    const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
        if (!canvasRef.current || !illoRef.current) return;

        // Atualiza o tempo da última interação sempre que houver um clique/toque
        lastInteractionTimeRef.current = Date.now();

        const rect = canvasRef.current.getBoundingClientRect();
        const touch = 'touches' in event.nativeEvent ?
            (event.nativeEvent.touches[0] || event.nativeEvent.changedTouches[0]) :
            (event as React.MouseEvent);

        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const mouseX = (touch.clientX - rect.left) * scaleX;
        const mouseY = (touch.clientY - rect.top) * scaleY;

        let hitDetected = false;

        gitProjects.forEach((project, i) => {
            const isRight = i % 2 !== 0;
            const xPos = isRight ? 180 : -180;
            const yBase = isMobile ? 350 - (i * totalHeight / 10) : 500 - (i * totalHeight / 10);

            const getProjectedPos = (x: number, y: number) => {
                const point = new Zdog.Vector({ x, y });
                const transformed = point.rotate(illoRef.current!.rotate).add(illoRef.current!.translate);
                return {
                    x: (transformed.x * illoRef.current!.zoom) + (canvasRef.current!.width / 2),
                    y: (transformed.y * illoRef.current!.zoom) + (canvasRef.current!.height / 2)
                };
            };

            const posName = getProjectedPos(xPos, yBase);
            const dist = Math.sqrt(Math.pow(mouseX - posName.x, 2) + Math.pow(mouseY - posName.y, 2));
            const threshold = illoRef.current!.zoom < 0.5 ? 120 : 60;

            if (dist < threshold) {
                hitDetected = true;
                applyZoom(xPos, yBase - 200);
            }
        });

        if (!hitDetected && isZoomedRef.current) resetZoom();
    };

    const applyZoom = (targetX: number, targetY: number) => {
        if (!illoRef.current) return;
        isZoomedRef.current = true;
        illoRef.current.dragRotate = false; // Desabilita rotação manual durante o zoom

        gsap.to(illoRef.current, {
            zoom: 1.1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true
        });

        gsap.to(illoRef.current.translate, {
            x: -targetX,
            y: -targetY,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true
        });
    };

    const resetZoom = () => {
        if (!illoRef.current) return;
        isZoomedRef.current = false;
        illoRef.current.dragRotate = true; // Reabilita rotação manual

        gsap.to(illoRef.current.translate, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.inOut"
        });

        gsap.to(illoRef.current, {
            zoom: isMobile ? 0.35 : 0.45,
            duration: 0.8,
            ease: "power3.inOut"
        });
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const Zdog = require('zdog');
        const ZfontModule = require('zfont');

        if (!isZfontInitialized) {
            const Zfont = ZfontModule.init ? ZfontModule : ZfontModule.default;
            Zfont.init(Zdog);
            isZfontInitialized = true;
        }

        const canvas = canvasRef.current;
        const illo = new Zdog.Illustration({
            element: canvas,
            padding: 20,
            dragRotate: true,
            sortVerts: true,
            translate: { x: 0, y: 0, z: 0 },
            zoom: isMobile ? 0.35 : 0.45,
        });

        illo.onDragStart = () => {
            isInteractingRef.current = true;

            // Mata qualquer animação de rotação em curso e traz para a frente
            gsap.to(illo.rotate, {
                x: -0.1, // Sua inclinação padrão de visualização
                y: 0,    // TOTALMENTE DE FRENTE
                duration: 0.6,
                ease: "power2.out"
            });
        };

        illo.onDragMove = function () {
            isInteractingRef.current = true;
            // Mantemos a inércia reduzida durante o movimento manual
            illo.rotate.y *= 0.98;
        };

        illo.onDragEnd = () => {
            isInteractingRef.current = false;
            lastInteractionTimeRef.current = Date.now();
        };

        const myFont = new Zdog.Font({
            src: '/fonts/Gugi/Gugi-Regular.ttf',
            onload: () => illo.updateRenderGraph()
        });

        // --- Ilustração ---

        // NOTA: O tronco global foi removido para ser processado em segmentos 
        // dentro do loop, garantindo o balanço de profundidade (Z-index).

        gitProjects.forEach((project, i) => {

            const isRight = i % 2 !== 0;
            const xPos = isRight ? 180 : -180;
            const yBase = isMobile ? 350 - (i * totalHeight / 10) : 100 - (i * totalHeight / 10); //400

            // Grupo que encapsula o nó central e seu respectivo pedaço de tronco
            const projectGroup = new Zdog.Group({
                addTo: illo,
                sortVerts: true,
            });

            // --- TÉCNICA DE BALANCEAMENTO DE Z-INDEX ---

            // 1. Segmento do Tronco (Pedaço unificado ao grupo)
            new Zdog.Shape({
                addTo: projectGroup,
                path: [{ y: -spacingY / 2 }, { y: spacingY / 2 }],
                stroke: 8,
                color: COLORS.line,
                translate: { y: yBase + 120, z: -2 }, // Ligeiramente atrás do nó
            });

            // 2. Nó do tronco (O centro colorido)
            new Zdog.Shape({
                addTo: projectGroup,
                translate: {
                    y: yBase + 120,
                    x: 0,
                    z: 0
                },
                color: project.colorBranch,
                stroke: 50,
            });

            // 3. Objeto Invisível de Contra-balanço (Técnica da Documentação)
            // Garante que o centroide do grupo permaneça estável na rotação
            new Zdog.Shape({
                addTo: projectGroup,
                visible: false,
                translate: { y: yBase + 120, z: -2 },
            });

            // --- FIM DA TÉCNICA DE BALANCEAMENTO ---

            // Retângulo base
            const rect = new Zdog.Rect({
                addTo: projectGroup,
                width: 160, //260 8 projects
                height: 60,
                translate: { x: xPos, y: yBase - 220 },
                stroke: 10,
                depth: 100,
                color: 'rgba(52, 52, 52, 1)',
                leftFace: 'rgba(52, 52, 52, 1)',
                rightFace: 'rgba(52, 52, 52, 1)',
                topFace: 'rgba(52, 52, 52, 1)',
                bottomFace: 'rgba(52, 52, 52, 1)',
                fill: true,
            });

            // Texto (Face frontal)
            new Zdog.Text({
                addTo: rect,
                font: myFont,
                backface: false,
                value: project.id.toUpperCase(),
                fontSize: 20,
                textAlign: 'center',
                textBaseline: 'middle',
                color: '#fff',
                fill: true,
                translate: { z: 8 }
            });

            // Texto de Trás (Espelhado para leitura correta no verso)
            new Zdog.Text({
                addTo: rect,
                font: myFont,
                backface: false,
                value: project.id.toUpperCase(),
                fontSize: 20,
                textAlign: 'center',
                textBaseline: 'middle',
                color: '#fff',
                fill: true,
                translate: { z: 8 },
                rotate: { y: Math.PI }
            });

            // Linha (Curva Bezier) conexão com nós
            new Zdog.Shape({
                addTo: projectGroup,
                path: [
                    { x: 0, y: yBase + 120 },
                    {
                        bezier: [
                            { x: 0, y: yBase + 40 },
                            { x: xPos, y: yBase + 40 },
                            { x: xPos, y: yBase }
                        ]
                    }
                ],
                closed: false,
                stroke: 8,
                color: project.colorBranch,
            });

            // Linhas do Ramo
            new Zdog.Shape({
                addTo: projectGroup,
                path: [{ y: yBase }, { y: yBase - 150 }],
                translate: { x: xPos, },
                stroke: 8,
                color: project.colorBranch,
            });

            // Círculo inferior da Branch
            new Zdog.Shape({
                addTo: projectGroup,
                translate: { x: xPos, y: yBase },
                color: project.colorBranch,
                stroke: 50,
            });

            // Círculo superior da Branch
            new Zdog.Shape({
                addTo: projectGroup,
                translate: { x: xPos, y: yBase - 150 },
                color: project.colorBranch,
                stroke: 50,
            });

            // --- Novos Nós com Contorno de Luz (Efeito Anel) ---

            // Definimos as propriedades do efeito de anel
            const outerStroke = 52; // Stroke maior (o contorno de luz)
            const innerStroke = 45; // Stroke menor (a cor do nó)
            const nodeGlowColor = '#fff'; // Cor de luz suave para o contorno

            [yBase + 120, yBase, yBase - 150].forEach((y, index) => {
                const nodePos = {
                    x: index === 0 ? 0 : xPos,
                    y: y,
                    z: index === 0 ? 1 : 4 // Nó central tem Z menor para não atravessar o tronco
                };

                // 1. O ANEL DE LUZ (Efeito Externo)
                new Zdog.Shape({
                    addTo: projectGroup,
                    translate: nodePos,
                    updateSort: true, // Força recalculo da profundidade
                    color: nodeGlowColor, // Luz suave que brilha ao redor
                    stroke: outerStroke,
                    fill: false, // Só queremos a borda, não o preenchimento
                });

                // 2. O CENTRO COLORIDO (Nó Interno)
                // Usamos um Z-offset de +2 para garantir que o centro 
                // fique visualmente À FRENTE do anel de luz
                new Zdog.Shape({
                    addTo: projectGroup,
                    translate: { ...nodePos, z: nodePos.z + 2 },
                    updateSort: true,
                    color: project.colorBranch,
                    stroke: innerStroke,
                    fill: true,
                });
            });
        });

        illoRef.current = illo;

        // Loop de Animação
        let frameId: number;

        const animate = () => {
            const now = Date.now();

            // Só aplicamos forças automáticas se NÃO estivermos interagindo
            if (!isInteractingRef.current && !isZoomedRef.current) {
                const timeSinceInteraction = now - lastInteractionTimeRef.current;

                // Se ficou 6 segundos parado, volta a girar
                if (timeSinceInteraction > 6000) {
                    illo.rotate.y += 0.005;
                }
            }

            illo.updateRenderGraph();
            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
            gsap.killTweensOf([illo.rotate, illo.translate, illo]);
            illo.children = [];
        };

    }, [isMobile, totalHeight]);

    return (
        <div className={styles.containerGraph2D}>
            {/* SVG ORIGINAL  GSAP */}
            <svg
                viewBox={`75 0 350 ${totalHeight}`}
                className={`${styles.svg2D} ${selectedProjectId ? styles.hidden2D : styles.visible2D}`}
                style={{ width: '100%', padding: '4rem' }}
            >
                <line
                    id="main-trunk"
                    x1={centerX} y1={totalHeight} x2={centerX} y2={spacingY / 2}
                    stroke={COLORS.line} strokeWidth="10"
                    strokeDasharray={totalHeight}
                    strokeDashoffset={totalHeight}
                />

                {gitProjects.map((project, i) => {
                    const isRight = i % 2 !== 0;
                    const targetX = isRight ? centerX + branchOffset : centerX - branchOffset;
                    const currentY = totalHeight - (isMobile ? i + 1.5 : i + 2) * spacingY;
                    const originY = currentY + 200; //200
                    const branchColor = isRight ? project.colorBranch : project.colorBranch;

                    return (
                        <g
                            key={project.id}
                            onClick={() => setSelectedProject(project.id)}
                            style={{ cursor: 'pointer', padding: '6rem' }}
                        >   

                            <g>
                                {/* Fundo (Retângulo) */}
                                <rect
                                    x={targetX - 180} // Centralização manual: (x - metade da largura)
                                    y={currentY - 246}
                                    width="100%"
                                    height="70"
                                    rx="10"
                                    fill="rgba(52, 52, 52, 1)"
                                    stroke={'#111'} // HEX puro para evitar erro no Zdog
                                    strokeWidth="3"
                                    textAnchor="middle" // Garante que o texto alinhe pelo centro do x
                                    className="project-label"
                                    style={{ opacity: 0,}} // Para sua animação GSAP
                                />

                                {/* O Texto (Sobreposto ao retângulo) */}
                                <text
                                    x={targetX}
                                    y={currentY - 200}
                                    fill="#ffffff"
                                    fontSize="26"
                                    textAnchor="middle" // Garante que o texto alinhe pelo centro do x
                                    className="project-label"
                                    style={{
                                        opacity: 0,
                                        fontFamily: 'Gugi, sans-serif',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    {project.id.toUpperCase()}
                                </text>
                            </g>

                            <path
                                className="git-branch-path"
                                d={`M ${centerX} ${originY} C ${centerX} ${originY - 150}, ${targetX} ${currentY + 80}, ${targetX} ${currentY}`}
                                fill="none" stroke={project.colorBranch} strokeWidth="10"
                                strokeDasharray={500} strokeDashoffset={500}
                            />

                            <line
                                className="git-branch-line"
                                x1={targetX} y1={currentY} x2={targetX} y2={currentY - 150}
                                stroke={project.colorBranch} strokeWidth="10"
                            />

                            <circle className="node-main" cx={centerX} cy={originY} r="32" fill={project.colorBranch} stroke={'#fff'} strokeWidth="3" />
                            <circle className="node-branch" cx={targetX} cy={currentY} r="32" fill={project.colorBranch} stroke={'#fff'} strokeWidth="3" />
                            <circle className="node-branch" cx={targetX} cy={currentY - 150} r="32" fill={branchColor} stroke={'#fff'} strokeWidth="3" />
                        </g>
                    );
                })}
            </svg>
            {/* MODO 3D OVERLAY */}
            {selectedProjectId && (

                <div className={styles.containerGraph3D}>
                    {/* Container relativo com tamanho fixo igual ao canvas visual */}
                    <div className={styles.contentGraph3D}>
                        <canvas
                            ref={canvasRef}
                            onClick={handleInteraction}
                            onTouchStart={handleInteraction} // Listener para mobile
                            width={400}
                            height={ isMobile ? 1150 : 1050}
                            style={{
                                height: '100vh',
                                cursor: 'grab',
                            }}
                        />
                    </div>

                    <button   
                        className={`${styles.buttonClose3D}`}
                        onClick={() => setSelectedProject(null)}
                    >
                        FECHAR
                    </button>
                </div>
            )}
        </div>
    );
};

export default GitGraph;
