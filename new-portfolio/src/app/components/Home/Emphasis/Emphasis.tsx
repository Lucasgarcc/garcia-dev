'use client';
import '../../../globals.css'
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Scene3D from './Emphasis.module.css';

const Home = () => {
	return (

		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={Scene3D.areaContainer}
		>
			<Typography className={Scene3D.title} variant="h2" gutterBottom>
				<span className={Scene3D.titleDetail}>Eai</span>, Eu sou Lucas
			</Typography>
			<Typography className={Scene3D.titleSubtitle} variant="h4" gutterBottom>
			 <span>{'< '}</span> Desenvolvedor / <span className={Scene3D.titleDetail}> Frontend </span> <span>{' >'}</span>
			</Typography>
 
			<Typography variant="body1" maxWidth={550}  textAlign={'justify'}>
				Sou um desenvolvedor Frontend apaixonado por criar experiências digitais incríveis. Com uma sólida formação em design e desenvolvimento web, estou sempre em busca de novos desafios e oportunidades para aprimorar minhas habilidades.
			</Typography>
			<Button variant="contained" sx={{ backgroundColor: 'var(--primary-c-3)', marginTop: '1rem', color: 'var(--color-text)' }}>

				<a href="https://wa.link/i3xug3" target="_blank" className="button button-flex" aria-label="Contate-me">
					contate-me <i className="uil uil-message button-icone"></i>
				</a>
			</Button>
		</motion.div>
	);
}

export default Home;