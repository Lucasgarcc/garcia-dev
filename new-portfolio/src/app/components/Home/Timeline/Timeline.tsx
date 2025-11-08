'use client';

import '../../../globals.css';
import React, {useState } from 'react';
import Styles from './Timeline.module.css';
import {Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { GiGraduateCap } from "react-icons/gi";
import { ImBriefcase } from "react-icons/im";
import { BsCalendarWeek } from "react-icons/bs";

const timelineData = {
	formacao: [
		{
		year: '2022 - 2022',
		title: 'Introdução Desenvolvimento Web',
		location: 'Remoto / #KICK',
		},
		{
		year: '2021 - 2023',
		title: 'Análise e Desenvolvimento de Sistemas',
		location: 'Ribeirão Preto - SP / UNIDERP Ribeirão Preto',
		},
		{
		year: '2023 - 2026',
		title: 'Frontend – Designer UI / UX',
		location: 'Rio de Janeiro - RJ / ORIGAMID',
		},
		{
			year: '2024 - 2024',
			title: 'Jascript – ES6+',
			location: 'Rio de Janeiro - RJ / ORIGAMID',
		},
		{
			year: '2023 - 2024',
			title: 'English',
			location: 'Guariba - SP / VPFI',
		},

		{
			year: '2024 - atual',
			title: 'React',
			location: 'Rio de Janeiro - RJ / ORIGAMID',
		},
		{
			year: '2025',
			title: 'Angular - TypeScript * Ionic & AngularJS',
			location: 'Guariba - SP / Avulso Online',
		},

	
	],
	trabalho: [
		{
		year: '2014 - 2024',
		title: 'Modelador de Plástico',
		location: 'Guariba - SP / Indústria Plástica',
		},
		{
		year: '2025 - Atual',
		title: 'Desenvolvedor Front-end Junior (web)',
		location: 'Jaboticabal / F5 Software',
		},
	],
};

const Timeline: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'formacao' | 'trabalho'>('formacao');

	const data = timelineData[activeTab];

	return (

		<motion.div 
			initial={{ opacity: 0, y: 90 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className={Styles.timelineContainer}>
			<Typography marginTop={15} color='var(--primary-c-2)' textTransform={'uppercase'} 
					variant="h4" className={Styles.title} marginBottom={4} textAlign={'center'} fontFamily='var(--font-title)' gutterBottom fontWeight={450}
				>
				Qualificações
			</Typography>
			<Typography
				fontSize={18}
				fontWeight={500}
				color='var(--primary-c-0-3)'
				textAlign="center"
				marginTop={2}
				marginBottom={5}
			>
				Minha Jornada Pessoal
			</Typography>

			{/* Tabs */}
			<div className={Styles.tabs}>
				<button
				onClick={() => setActiveTab('formacao')}
				className={`${Styles.tabButton} ${
					activeTab === 'formacao' ? Styles.active : ''
				}`}
				>
				<GiGraduateCap size={24} />
				Formação
				</button>
				<button
				onClick={() => setActiveTab('trabalho')}
				className={`${Styles.tabButton} ${
					activeTab === 'trabalho' ? Styles.active : ''
				}`}
				>
				<ImBriefcase size={20} />
				Trabalho
				</button>
			</div>

			{/* Timeline Grid */}
			<div className={Styles.timelineGrid}>
				{data.map((item, index) => (
				<motion.div
					key={index}
					className={`${Styles.timelineItem} ${index % 2 === 0 ? Styles?.left : Styles?.right}`}
					initial={{ opacity: 0, y: 60, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
					whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
					transition={{
						duration: 0.6,
						delay: index * 0.1, // efeito cascata
						ease: [0.25, 0.1, 0.25, 1], // ease suave
					}}
					viewport={{ once: true, amount: 0.3 }}>
					<div className={Styles.content}>
					<h3>{item.title}</h3>
					<p>{item.location}</p>
					<span className={Styles.year}> <BsCalendarWeek className={Styles.IconCalendary} size={14} /> {item.year}</span> 
					</div>
				</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default Timeline;