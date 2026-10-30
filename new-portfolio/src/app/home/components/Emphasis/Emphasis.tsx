'use client';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Scene3D from './Emphasis.module.css';
import RotateWords from '@/app/_components/ui/Animations/RotateWords/RotateWords';
import GradualSpacing from '@/app/_components/ui/Animations/GradualSpaing/GradualSpaing';
import { useLanguage } from '@/app/core/context/LanguageContext';

const wordTitle = [
    'Front End',
    'Back End',
    'Front End'
]

const Home = () => {
	const { t } = useLanguage();
	const { intro: translatedIntro } = t.home;


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
                    {t.home.introTitle}
                </GradualSpacing>
			</Typography>

            <Typography className={Scene3D.titleSubtitle} fontWeight={450} variant="h4" gutterBottom>
                <span style={{ color: 'var(--green-500)' }}>{'< '}</span>{t.home.developer} <span style={{ color: 'var(--green-500)' }}> / </span>
                    <RotateWords text="" className={Scene3D.titleDetail} words={wordTitle} />
                <span style={{ color: 'var(--green-500)'}}>{' >'}</span>
			</Typography>

            <Typography className={Scene3D.description} variant="body1" display={'block'} fontWeight={450} fontSize={20} maxWidth={'100%'} marginBottom={4} letterSpacing={0} fontFamily={'var(--font-roboto)'}>
				
               {translatedIntro.before}<strong className={Scene3D.datails}>{translatedIntro.emphasis}</strong>{translatedIntro.middle}<strong className={Scene3D.datails}>{translatedIntro.secondEmphasis}</strong>{translatedIntro.after}
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

				<a href="https://wa.link/i3xug3" target="_blank" rel="noopener noreferrer" className="button button-flex" aria-label={t.common.contactMe}>
					{t.common.contactMe} <i className="uil uil-message button-icone"></i>
				</a>
			</Button>
			
		</motion.div>
		
	);
}

export default Home;
