"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from './InteractiveGrid.module.css';

export const InteractiveGrid = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const THEME = {
        r: 145,
        g: 191,
        b: 39,
        hex: "#91bf27"
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let points: {
            x: number; y: number;
            intensity: number;
            pulseDelay: number;
            randomPulse: number;
            rippleIntensity: number; // Nova propriedade para a onda de choque
        }[] = [];

        let ripples: { x: number; y: number; radius: number; opacity: number }[] = [];
        const spacing = 22;
        const mouse = { x: -1000, y: -1000 };
        let startTime = Date.now();

        const init = () => {
            canvas.width = containerRef.current!.offsetWidth;
            canvas.height = containerRef.current!.offsetHeight;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            points = [];
            for (let x = 0; x < canvas.width; x += spacing) {
                for (let y = 0; y < canvas.height; y += spacing) {
                    const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                    points.push({
                        x, y,
                        intensity: 0,
                        pulseDelay: distFromCenter / 800,
                        randomPulse: Math.random(),
                        rippleIntensity: 0
                    });
                }
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const elapsed = (Date.now() - startTime) / 1000;

            points.forEach((p) => {

                // Pulsação Aleatória (Sutil)
                let fiberLight = 0;
                if (elapsed > p.pulseDelay) {
                    fiberLight = Math.max(0, 0.6 - (elapsed - p.pulseDelay) * 0.5);
                }
                const organicPulse = Math.sin(elapsed * 2 + p.randomPulse * 10) * 0.1;

                // Interação Mouse (Sutil)
                const dxM = mouse.x - p.x;
                const dyM = mouse.y - p.y;
                const distMouse = Math.sqrt(dxM * dxM + dyM * dyM);
                const mouseEffect = Math.max(0, (120 - distMouse) / 120) * 0.3;

                // ONDA (CLICK)
                let waveEffect = 0;
                ripples.forEach(ripple => {
                    const dxR = ripple.x - p.x;
                    const dyR = ripple.y - p.y;
                    const distRipple = Math.sqrt(dxR * dxR + dyR * dyR);

                    // Cria uma área de influência muito maior (fade-off suave)

                    // raio da onda, ele ganha intensidade
                    if (distRipple < ripple.radius) {

                        // Cálculo de queda de luz: quanto mais longe do centro da onda, 
                        
                        // mas perto da borda de expansão, mais forte é o brilho.
                        const proximityToEdge = 1 - Math.abs(distRipple - ripple.radius) / ripple.radius;
                        const falloff = Math.pow(proximityToEdge, 2); // Deixa o rastro mais "cheio"

                        waveEffect += falloff * ripple.opacity;
                    }
                });

                const totalLight = fiberLight + organicPulse + mouseEffect + waveEffect;
                const opacity = 0.05 + Math.min(0.9, totalLight);

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${THEME.r}, ${THEME.g}, ${THEME.b}, ${opacity})`;

                if (totalLight > 0.35) {
                    ctx.shadowBlur = 12 * totalLight;
                    ctx.shadowColor = THEME.hex;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            });

            requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            gsap.to(mouse, {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                duration: 0.8,
                ease: "power2.out"
            });
        };

        const handleClick = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const newRipple = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                radius: 0,
                opacity: 1
            };

            ripples.push(newRipple);

            // Anima a onda expandindo e sumindo
            gsap.to(newRipple, {
                radius: 1200,
                opacity: 0,
                duration: 4.5,
                ease: "expo.out", 
                onComplete: () => {
                    ripples = ripples.filter(r => r !== newRipple);
                }
            });
        };

        window.addEventListener("resize", init);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        init();
        render();

        return () => {
            window.removeEventListener("resize", init);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div ref={containerRef} className={`${styles.container} ${className}`}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.content}>{children}</div>
        </div>
    );
};