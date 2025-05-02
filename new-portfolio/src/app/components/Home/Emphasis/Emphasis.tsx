'use client';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
export default function Home() {
  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    
      <Typography variant="h2" gutterBottom>
        Eai, Eu sou Lucas
      </Typography>
      <Typography variant="h4" gutterBottom>
        Desenvolvedor Frontend
      </Typography>
 
      <Typography variant="body1" maxWidth={550} textAlign={'justify'}>
        Sou um desenvolvedor Frontend apaixonado por criar experiências digitais incríveis. Com uma sólida formação em design e desenvolvimento web, estou sempre em busca de novos desafios e oportunidades para aprimorar minhas habilidades.
      </Typography>
      <Button variant="contained" sx={{ backgroundColor: '#749f21', marginTop: '1rem' }}>

        <a href="https://wa.link/i3xug3" target="_blank" className="button button-flex" aria-label="Contate-me">
          contate-me <i className="uil uil-message button-icone"></i>
        </a>
      </Button>
    </motion.div>
  );
}
