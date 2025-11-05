'use client';
import React from 'react';
import '../../globals.css';
import { Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import PerfilI from '../../../../public/assets/perfil_garcia.png'
import { motion } from 'framer-motion';
import { GrContact } from "react-icons/gr";
import Styles from './ContactMe.module.css';

const theme = createTheme({ 
  palette: { 
    primary: {
      main: '#000',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {   
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'var(--bg-secondary-c)', /* 🎨 fundo do input */
            borderRadius: '8px', /* opcional: cantos arredondados */
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
            
            '&:hover': {
              backgroundColor: 'var(--bg-secondary-c)', /* fundo ao passar mouse */
            },

            '&.Mui-focused': {
              backgroundColor: 'var(--bg-secondary-c)', /* fundo ao focar */
            },

            '& fieldset': {
              borderColor: 'var(--bg-secondary-c)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--primary-c-1)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-text-secondary-c)',  
            },
          },
          '& .MuiInputLabel-root': {  
            color: 'var(--color-text)', /* cor do label */
          },
          '& .MuiInputLabel-root.Mui-focused': {  
            color: 'var(--color-text-p)',
          },
          '& .MuiOutlinedInput-input': {
            color: 'var(-color-text-p)', /* texto digitado */
          },
        },
      },  
    },
  },
});



const ContactMe = () => {
    return (
       
        <ThemeProvider  theme={theme}>     
            <Typography

                    marginTop={30}
                    color='var(--primary-c-2)'
                    textTransform={'uppercase'}     
                    variant="h4"
                    align='center'
                    marginBottom={1}
                    textAlign={'center'}
                    fontFamily='var(--font-title)'
                    gutterBottom
                    fontWeight={500}
                >
                Contato
            </Typography>   
            <motion.div
                animate={{ opacity: 2, y: 0 }}          
                transition={{ duration: 0.5 }}
                className={Styles.contactContainer}
            >
   
                <div className={Styles.contactFormContainer}>
                    <figure className={Styles.perfilIContainer}>
                        <Image className={Styles.perfilI}
                            src={PerfilI}
        
                            alt={`Foto minha ${PerfilI}`}
                            style={{ objectFit: 'contain', 						
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0)',
                                filter: `
                                    drop-shadow(0 0 4px rgba(47, 46, 46, 0.36)) 
                                    drop-shadow(0 0 8px rgba(97, 97, 97, 0.32)) 
                                    drop-shadow(0 0 12px rgba(43, 43, 43, 0.25))
                                `, 
                            }}
                        />
                    </figure>


                    <div>
                        <h5 className={Styles.contactFormTitle}>
                            <span className={Styles.contactFormContentTitle}>
                                <GrContact  color='var(--primary-c-0-1)'/> Entrar em contato
                            </span> 
                            </h5>
                        <form className={Styles.contactForm} 
                            action="https://formspree.io/f/mayvlrza" method="POST">
                            <TextField
                                label="Nome"
                                name="name"
                                variant="outlined"          
                                fullWidth

                                required  
                                className={Styles?.contactInput}      
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"          
                                fullWidth   
                                margin="normal"
                                required
                                color="primary"
                                className={Styles?.contactInput}   
                            />
                            <TextField
                                label="Mensagem"    
                                name="message"
                                variant="outlined"
                                fullWidth   
                                margin="normal"
                                required
                                multiline 
                                rows={4}
                            />
                            <Button     
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ backgroundColor: 'var(--primary-c-3)', marginTop: '1rem', color: 'var(--color-text-n)',
                                    textAlign: 'center',
                                    fontSize: '1.1rem',
                                    ":hover": {
                                        backgroundColor: "var(--primary-c-0-4)",
                                        color: "var(--primary-c-0-5)",
                                        transform: "translateY(-2px)",
                                    },
                                    transition: "all 0.3s ease",
                                    textTransform: 'none'
                                }}
                                className={Styles.contactButton}
                            >
                                Enviar
                            </Button>
                        </form>
                    </div>

                </div>
            </motion.div>
        </ThemeProvider >
        
    );
};

export default ContactMe;
    

