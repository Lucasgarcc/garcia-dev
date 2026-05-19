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
                    backgroundColor: 'var(--primary-c-3)',
                    marginTop: '1rem',
                    fontFamily: 'var(--font-roboto)',
                    padding: '.5rem',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    borderRadius: '.4rem',
                    color: 'var(--color-text-n)',
                    border: "1px solid var(--color-text-n)",
                    ":hover": {
                        backgroundColor: "var(--primary-c-0-4)",
                        color: "var(--secondary-c-1)",
                        border: "1px solid var(--primary-c-0-2)",
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
