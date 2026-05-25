'client'

import React from 'react';
import Styles from './ViableResume.module.css';
import { Button } from '@mui/material';
import { BsDownload } from "react-icons/bs";
const ViableResume = () => {
    return (
        <div>
            <Button
                component="a" // transforma o botão em link
                href="/assets/LucasGarcia-DesenvolvedorFrontend.pdf" // arquivo na pasta public
                download
                target="_blank"
                variant="contained"
                className={Styles.VariableResumeButton}
                sx={{
                    backgroundColor: 'var(--color-accent-button)',
                    marginTop: '1rem',
                    fontFamily: 'var(--font-roboto)',
                    padding: '.5rem',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    borderRadius: '.4rem',
                    color: 'var(--text-future)',
                    border: "1px solid var(--text-on-accent)",
                    ":hover": {
                        backgroundColor: "var(--green-300)",
                        color: "var(--green-600)",
                        border: "1px solid var(--green-200)",
                        transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    textTransform: 'none'
                }}
                startIcon={<BsDownload />}
                aria-label="Baixar CV"
                size="large" 
            >
                Baixar CV
            </Button>
        </div>
    );
}

export default ViableResume;
