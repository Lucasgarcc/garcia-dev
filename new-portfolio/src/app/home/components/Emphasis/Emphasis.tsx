'use client';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Scene3D from './Emphasis.module.css';
import RotateWords from '@/app/_components/ui/Animations/RotateWords/RotateWords';
import GradualSpacing from '@/app/_components/ui/Animations/GradualSpaing/GradualSpaing';

const wordTitle = [
    'Front End',
    'Back End',
    'Front End'
]

const Home = () => {
	return (

		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={Scene3D.areaContainer}
		>
			<Typography className={Scene3D.title} variant="h2" gutterBottom fontFamily={'var(--font-title)'} fontWeight={500}>
                <GradualSpacing> 
                    <span className={Scene3D.titleDetail}>Eai</span>
                    <span style={{ color: 'var(--green-500)' }}>,</span> 
                    Sou Lucas 
                </GradualSpacing>
			</Typography>

            <Typography className={Scene3D.titleSubtitle} fontWeight={450} variant="h4" gutterBottom>
                <span style={{ color: 'var(--green-500)' }}>{'< '}</span>Desenvolvedor <span style={{ color: 'var(--green-500)' }}> / </span>
                    <RotateWords text="" className={Scene3D.titleDetail} words={[wordTitle[0], wordTitle[1], wordTitle[2]]} />
                <span style={{ color: 'var(--green-500)'}}>{' >'}</span>
			</Typography>

            <Typography className={Scene3D.description} variant="body1" display={'block'} fontWeight={450} fontSize={20} maxWidth={'100%'} marginBottom={4} letterSpacing={0} fontFamily={'var(--font-roboto)'}>
				
                Sou um desenvolvedor Frontend apaixonado por <strong className={Scene3D.datails}>criar experiências</strong> digitais incríveis. Com uma sólida formação em design e <strong className={Scene3D.datails}>desenvolvimento web</strong>, estou sempre em busca de novos desafios e oportunidades para aprimorar minhas habilidades.
			</Typography>
            <Button variant="contained" sx={{
                    backgroundColor: 'var(--color-accent-button)', 
                    marginTop: '1rem',
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--text-future)',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    borderRadius: '.4rem',
                    ":hover": {
                        backgroundColor: "var(--green-300)",
                        color: "var(--green-700)",
                        border: "1px solid var(--green-200)",
                        transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    textTransform: 'none'
                }}>

				<a href="https://wa.link/i3xug3" target="_blank" className="button button-flex" aria-label="Contate-me">
					Contate-me <i className="uil uil-message button-icone"></i>
				</a>
			</Button>
			
		</motion.div>
		
	);
}

export default Home;