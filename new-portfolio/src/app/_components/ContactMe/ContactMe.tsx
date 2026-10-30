'use client';
import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import PerfilI from '../../../../public/assets/perfil_garcia.png'
import { motion } from 'framer-motion';
import { GrContact } from "react-icons/gr";
import Styles from './ContactMe.module.css';
import { useLanguage } from '@/app/core/context/LanguageContext';

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
                        backgroundColor: 'var(--surface-secondary)', /* 🎨 fundo do input */
                        color: 'var(--text-primary)', /* cor do texto */
                        borderRadius: '8px', /* opcional: cantos arredondados */
                        transition: 'background-color 0.3s ease, border-color 0.3s ease',

                        '&:hover': {
                            backgroundColor: 'var(--surface-secondary)', /* fundo ao passar mouse */
                        },

                        '&.Mui-focused': {
                            backgroundColor: 'var(--surface-secondary)', /* fundo ao focar */
                        },

                        '& fieldset': {
                            borderColor: 'var(--surface-secondary)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'var(--green-100)', /* borda ao passar mouse */
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'var(--text-primary)', /* borda ao focar */
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'var(--text-primary)', /* cor do label */
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'var(--text-secondary-p)',
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
    const { t } = useLanguage() as unknown as {
        t: {
            nav: { contact: string };
            common: {
                getInTouch: string;
                name: string;
                message: string;
                send: string;
            };
        };
    };

    if (!t || !t.nav || !t.common) {
        return null; // ou um esqueleto de carregamento <Skeleton />
    }
    
    return (

        <ThemeProvider theme={theme}>
            <Typography

                color='var(--green-500)'
                textTransform={'uppercase'}
                variant="h4"
                align='center'
                textAlign={'center'}
                fontFamily='var(--font-altric)'
                gutterBottom
                fontWeight={500}
            >
                {t.nav.contact}
            </Typography>
            <motion.div
                className={Styles.contactContainer}
            >

                <div className={Styles.contactFormContainer}>
                    <figure className={Styles.perfilIContainer}>
                        <Image className={Styles.perfilI}
                            src={PerfilI}
                            alt={`Foto minha`}
                            loading="lazy"
                            placeholder="blur"
                            style={{
                                objectFit: 'contain',
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0)',
                                filter: `
                                    drop-shadow(0 0 4px rgba(47, 46, 46, 0.36)) 
                                    drop-shadow(0 0 8px rgba(97, 97, 97, 0.32)) 
                                    drop-shadow(0 0 12px rgba(43, 43, 43, 0.25))
                                `,
                            }}
                        />
                    </figure>
                    <div className={Styles.containerForm}>
                        <h5 className={Styles.contactFormTitle}>
                            <span className={Styles.contactFormContentTitle}>
                                <GrContact color='var(--green-100)' /> {t.common.getInTouch}
                            </span>
                        </h5>
                        <form className={Styles.contactForm}
                            action="https://formspree.io/f/mayvlrza" method="POST">
                            <TextField
                                label={t.common.name}
                                name="name"
                                variant="outlined"
                                fullWidth
                                required
                                autoComplete="name"
                                className={Styles.contactInput}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                autoComplete="email"
                                color="primary"
                                className={Styles.contactInput}
                            />
                            <TextField
                                label={t.common.message}
                                name="message"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                multiline
                                rows={4}
                                className={Styles.contactInput}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: 'var(--green-dark)',
                                    marginTop: '1rem',
                                    textAlign: 'center',
                                    fontSize: '1.1rem',
                                    borderRadius: '.4rem',
                                    border: "1px solid var(--text-on-accent)",
                                    ":hover": {
                                        backgroundColor: "var(--green-300)",
                                        color: "var(--green-700)",
                                        fontFamily: 'var(--font-roboto)',
                                        border: "1px solid var(--green-200)",
                                        transform: "translateY(-2px)",
                                    },
                                    transition: "all 0.3s ease",
                                    textTransform: 'none'
                                }}
                                className={Styles.contactButton}
                            >
                                {t.common.send}
                            </Button>
                        </form>
                    </div>

                </div>
            </motion.div>
        </ThemeProvider >

    );
};

export default ContactMe;
