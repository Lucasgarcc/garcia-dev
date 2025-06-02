'use client';
import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Scene3D from './Scene3D.module.css';
import profile from '../../../../public/assets/profile.png';
import react from '../../../../public/assets/react.png';
import html from '../../../../public/assets/html.png';
import css from '../../../../public/assets/css3.png';
import node from '../../../../public/assets/nodejs-11492982.png';
import ts from '../../../../public/assets/typescript.png';
import js from '../../../../public/assets/JS.png';
import angular from '../../../../public/assets/angular.png';

const logos = [react, html, css, node, ts, js, angular];


export default function OrbitLogos() {

	const [time, setTime] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	/**
	 * Hook para animação de quadro 
	 * @param callback Função a ser chamada em cada quadro
	 * @param delay Atraso entre os quadros (em milissegundos)
	 */
	useAnimationFrame((t) => {
		setTime(t / 1000); // 1 segundo = 1 unidade
	});

	const radius = 150;

	return (
		<>
			<div className={Scene3D.areaContainer} ref={containerRef}>

				{/* Foto central */}
				<motion.div
					style={{
						overflow: 'hidden',
						position: 'absolute',
						maxWidth: '100%',
						top: '33%',
						left: '45%',
						width: 'auto',
						backgroundColor: 'transparent',
						transform: 'translate(-50%, -50%)',
						zIndex: 1000,
						boxShadow: '0 0 15px rgba(0, 0, 0, 0)',
						filter: `
                            drop-shadow(0 0 4px rgba(47, 46, 46, 0.36)) 
                            drop-shadow(0 0 8px rgba(97, 97, 97, 0.32)) 
                            drop-shadow(0 0 12px rgba(43, 43, 43, 0.25))
                        `,
					}}
					animate={{
						rotate: [0, 5, -5, 0], // leve balanço
						y: [0, 5, 0],
						x: [0, 9, 0]         // leve flutuação
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<Image src={profile} className={Scene3D.profile} alt="Minha foto" />
				</motion.div>

				{/* Logos Orbitando */}
				{logos.map((logo, index) => {

					const angle = (index / logos.length) * Math.PI * 2 + time * 0.5;
					const yAngle = Math.sin(time + index) * 0.5;

					const x = Math.cos(angle) * radius;
					const y = Math.sin(yAngle) * radius * 0.5;
					const z = Math.sin(angle) * radius;

					return (
						<motion.div
							key={index}
							className={Scene3D.logoContainer}
							style={{
								overflow: 'hidden',
								width: 50,						
                                height: 50,
								position: 'absolute',
								top: '40%',
								left: '72%',
								zIndex: 1000,
								transform: `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`,
								transformStyle: 'preserve-3d',
							}}
						>
							<Image className={Scene3D.logo}
								src={logo}
								alt={`Logo ${logo}`}
								width={50}
								height={50}
								style={{ objectFit: 'contain' }}
							/>
						</motion.div>
					);
				})}
			</div>
		</>

	);
}
