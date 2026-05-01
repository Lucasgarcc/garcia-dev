'use client';
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import Zdog from 'zdog';
import gsap from 'gsap';
import gitProjects from '../data/gitProjects';
import { useProjectsSelection } from '../context/ProjectsSelectionContext';
import styles from './GitGraph.module.css';
import useMediaQuery from '@/core/hooks/MediaQuery/MediQuery';
import { LightingNode} from '@/core/interfaces/gitProject'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const COLORS = {
    main: '#FFF6F6',
    line: '#FFF6F6',//branco
    text: '#ffffff'
};

let isZfontInitialized = false;

const GitGraph = () => {
    
    const { 
        selectedProject,
        isMode3D,
        setIsMode3D, 
        isCardOpen, 
        setSelectedProject
    } = useProjectsSelection();

    const isMobile = useMediaQuery('(max-width: 1024px)');

    // Refs para persistência de estado sem re-render
    const nodesRef = useRef<LightingNode[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const illoRef = useRef<Zdog.Illustration | null>(null);
    const isInteractingRef = useRef(false);
    const isZoomedRef = useRef(false);
    const lastInteractionTimeRef = useRef(Date.now());

    let spacingY = (selectedProject
                    ? 260  : isMobile && selectedProject
                    ? 280 : isMobile 
                    ? 250 : 240); //210 - selectedP.3D com 8 projects
    
    const centerX = 250;
    let branchOffset = selectedProject ? 250 : 250;

    const heightMultiplier = selectedProject && isMobile ? 1 :  1.7 ;
    const totalHeight = (gitProjects.length + heightMultiplier) 
                        && (selectedProject ? gitProjects.length + 1.2 : gitProjects.length + 1.7) 
                        * spacingY;

    isMobile ? (branchOffset = 250) && (spacingY = 270) : branchOffset = 230;
    
    const toggleMode = (projectId: string) => {

        setSelectedProject(projectId);
       return setIsMode3D(true);
        
    }

    const shouldShowCloseButton = isMobile ? isCardOpen : !isMode3D || !isCardOpen;
  
    const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
        // 1. Previne comportamentos estranhos do mobile (como scroll enquanto tenta clicar)
        if (event.cancelable) event.preventDefault();
        event.stopPropagation();

        if (!canvasRef.current || !illoRef.current) return;

        lastInteractionTimeRef.current = Date.now();

        const rect = canvasRef.current.getBoundingClientRect();

        // 2. Normalização precisa para Mobile
        let clientX, clientY;
        if ('touches' in event.nativeEvent) {
            // Usamos changedTouches para capturar o ponto exato do fim do toque ou toque rápido
            const touch = event.nativeEvent.touches[0] || event.nativeEvent.changedTouches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = (event as React.MouseEvent).clientX;
            clientY = (event as React.MouseEvent).clientY;
        }

        // 3. Ajuste de escala do Canvas (crucial para Mobile)
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        const mouseX = (clientX - rect.left) * scaleX;
        const mouseY = (clientY - rect.top) * scaleY;

        let bestCandidate = { index: -1, z: -Infinity, x: 0, y: 0 };

        gitProjects.forEach((project, i) => {

            const isRight = i % 2 !== 0;
            const xPos = isRight ? 180 : -180;
            const yBase = isMobile ? 350 - (i * totalHeight / 10) : 100 - (i * totalHeight / 10);

            const getProjectedPoint = (x: number, y: number) => {
                // Criamos o vetor com a posição exata do desenho
                let v = new Zdog.Vector({ x, y, z: 0 });

                // APLICAMOS AS TRANSFORMAÇÕES NA ORDEM CORRETA
                v.rotate(illoRef.current!.rotate);
                v.add(illoRef.current!.translate);

                return {
                    x: (v.x * illoRef.current!.zoom) + (canvasRef.current!.width / 2),
                    y: (v.y * illoRef.current!.zoom) + (canvasRef.current!.height / 2),
                    z: v.z
                };
            };

            // Focamos 100% na Label e no Nó do Galho (longe do centro)
            const labelPos = getProjectedPoint(xPos, yBase - 220);
            const nodePos = getProjectedPoint(xPos, yBase);

            // No panorâmico, o raio de colisão precisa ser grande o suficiente para o dedo
            const currentZoom = illoRef.current!.zoom;
            const hitRadius = isMobile ? ((totalHeight / 8) / currentZoom ) * 0.5 : 60;

            const fingerOffset = isMobile ? 30 : 0;

            const distLabel = Math.sqrt(
                Math.pow(mouseX - labelPos.x, 2) +
                Math.pow(mouseY - (labelPos.y + fingerOffset), 2)
            );
     
            const distNode = Math.sqrt(Math.pow(mouseX - nodePos.x, 2) + Math.pow(mouseY - nodePos.y, 2));

            if (distLabel < hitRadius || distNode < hitRadius) {

                setSelectedProject(project.id);

                if (labelPos.z > bestCandidate.z) {
                    bestCandidate = {
                        index: i,
                        z: labelPos.z,
                        x: xPos,
                        y: yBase - 100
                    };
                }
            }
        });

        if (bestCandidate.index !== -1) {
            
            applyZoom(bestCandidate.x, bestCandidate.y);
        } else if (isZoomedRef.current) {
            resetZoom();
        }

    };

    const applyZoom = (targetX: number, targetY: number) => {
        if (!illoRef.current) return;

        // Trava lógica em vez de desligar a propriedade
        isZoomedRef.current = true;

        gsap.to(illoRef.current, {
            zoom: 1.1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true // Evita conflitos de cliques rápidos
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

        gsap.to(illoRef.current.translate, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power3.inOut"
        });

        gsap.to(illoRef.current, {
            zoom: isMobile ? 0.40 : 0.45,
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
            zoom: isMobile ? 0.40 : 0.45,
        });

        illo.onDragStart = () => {
            if (isZoomedRef.current) return;

            isInteractingRef.current = true;

            gsap.to(illo.rotate, {
                x: -0.1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
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

        nodesRef.current = [];

        gitProjects.forEach((project, i) => {
            const isRight = i % 2 !== 0;
            const xPos = isRight ? 180 : -180;
            const yBase = isMobile ? 350 - (i * totalHeight / 10) : 100 - (i * totalHeight / 10); //400

            const projectGroup = new Zdog.Group({
                addTo: illo,
                sortVerts: true,
            });

            // 1. Segmento do Tronco
            new Zdog.Shape({
                addTo: projectGroup,
                path: [{ y: -spacingY / 3 }, { y: spacingY / 2 }],
                stroke: 8,
                color: COLORS.line,
                translate: { y: yBase + 120, z: -2 },
            });

            // 2. Retângulo base (Label)
            const rect = new Zdog.Rect({
                addTo: projectGroup,
                width: 260,
                height: 60,
                translate: { x: xPos, y: yBase - 220 },
                stroke: 10,
                depth: 100,
                color: 'rgba(52, 52, 52, 1)',
                fill: true,
            });

            // --- TEXTOS ---
            [{ z: 8, r: 0 }, { z: 8, r: Math.PI }].forEach(face => {
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
                    translate: { z: face.z },
                    rotate: { y: face.r }
                });
            });

            // 3. Conexões (Bezier e Ramo)
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

            new Zdog.Shape({
                addTo: projectGroup,
                path: [{ y: yBase }, { y: yBase - 120 }],
                translate: { x: xPos },
                stroke: 8,
                color: project.colorBranch,
            });

            // --- NOVOS NÓS COM EFEITO DE ILUMINAÇÃO ---
            const outerStroke = 52;
            const innerStroke = 45;

            [yBase + 120, yBase, yBase - 150].forEach((y, index) => {
                const nodePos = {
                    x: index === 0 ? 0 : xPos,
                    y: y,
                    z: index === 0 ? 1 : 4
                };

                // A. O ANEL DE LUZ (Contorno fixo)
                new Zdog.Shape({
                    addTo: projectGroup,
                    translate: nodePos,
                    color: '#fff',
                    stroke: outerStroke,
                    fill: false,
                });

                // B. O CENTRO COLORIDO (O que vai reagir ao animate)
                const coreNode = new Zdog.Shape({
                    addTo: projectGroup,
                    translate: { ...nodePos, z: nodePos.z + 2 },
                    color: project.colorBranch,
                    stroke: innerStroke,
                    fill: true,
                });

                // C. O PONTO ESPECULAR (Brilho fixo de "vidro")
                new Zdog.Shape({
                    addTo: coreNode,
                    stroke: 8,
                    translate: { x: -10, y: -10, z: 12 },
                    color: 'rgba(255, 255, 255, 0.4)',
                });

                // (TypeScript / Lighting Engine)
                // Aqui salvamos a referência para que o loop mude a cor dinamicamente
                nodesRef.current.push({
                    shape: coreNode as unknown as { color: string },
                    baseColor: project.colorBranch, // Cor que você definiu
                    highlightColor: project.colorBranch       // Alvo do brilho
                });
            });
        });

        illoRef.current = illo;

        // Loop de Animação
        let frameId: number;


        const lerpColor = (color1: string, color2: string, factor: number) => {
            // Converte hex para RGB simples (ex: #ff0000)
            const r1 = parseInt(color1.substring(1, 3), 16);
            const g1 = parseInt(color1.substring(3, 5), 16);
            const b1 = parseInt(color1.substring(5, 7), 16);

            const r2 = parseInt(color2.substring(1, 3), 16);
            const g2 = parseInt(color2.substring(3, 5), 16);
            const b2 = parseInt(color2.substring(5, 7), 16);

            const r = Math.round(r1 + factor * (r2 - r1));
            const g = Math.round(g1 + factor * (g2 - g1));
            const b = Math.round(b1 + factor * (b2 - b1));

            return `rgb(${r}, ${g}, ${b})`;
        };

        const animate = () => {
            const now = Date.now();
            const illo = illoRef.current;
            if (!illo) return;

            // 1. Definição da Luz (estática no espaço)
            const lightVector = new Zdog.Vector({ x: 1, y: -1, z: 1 });

            // 2. Atualizar todos os objetos que devem reagir à luz
            // Você pode armazenar seus nós em um Array na criação para iterar aqui
            nodesRef.current.forEach((nodeObj)  => {
                const { shape, baseColor, highlightColor } = nodeObj;

                // Calcula a Normal do objeto baseada na rotação do mundo
                const normal = new Zdog.Vector({ z: 1 }).rotate(illo.rotate);

                // Produto Escalar (Dot Product)
                const dot = normal.x * lightVector.x + normal.y * lightVector.y + normal.z * lightVector.z;

                // Mapeia o dot (-1 a 1) para um fator de brilho (0.2 a 1.0 para não ficar preto total)
                const brightness = Math.max(0.2, (dot + 1) / 2);

                shape.color = lerpColor(baseColor, highlightColor, brightness);
            });

            // 3. Lógica de Rotação Automática (Sua lógica atual)
            if (!isInteractingRef.current && !isZoomedRef.current) {
                if (now - lastInteractionTimeRef.current > 6000) {
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
                className={`${styles.svg2D} ${selectedProject ? styles.hidden2D : styles.visible2D}`}
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
                            onClick={() => toggleMode(project.id)}
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
            {selectedProject && (

                <div className={styles.containerGraph3D}>
                    {/* Container relativo com tamanho fixo igual ao canvas visual */}
                    <div className={styles.contentGraph3D}>
                        <canvas
                            ref={canvasRef}
                            onClick={handleInteraction}
                            onTouchStart={handleInteraction} 
                            onMouseDown={handleInteraction}
                            width={400}
                            height={ isMobile ? 1150 : 990}
                            style={{
                                maxWidth:'100vw',
                                height: '100vh',
                                cursor: 'grab',
                                touchAction: 'none',
                            }}
                        />
                    </div>

                   {shouldShowCloseButton && (
                        <button   
                            className={`${styles.buttonClose3D}`}
                            onClick={() => {
                                setIsMode3D(false);
                                setSelectedProject(null); // Limpa seleção ao sair do 3D
                            }}
                        >                        
                            <ExitToAppIcon sx={{ fontSize: 35 }} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default GitGraph;
