'client'

import React from 'react';
import Styles from './ViableResume.module.css';
import { Button } from '@mui/material';
import { BsDownload } from "react-icons/bs";
import { useLanguage } from '@/app/core/context/LanguageContext';
const ViableResume = () => {
    const { t } = useLanguage();
    return (
        <div>
            <Button
                component="a" // transforma o botão em link
                href="/Lucas_Garcia_Curriculo_Angular.pdf" // arquivo na pasta public
                download
                target="_blank"
                rel="noopener noreferrer"
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
                aria-label={t.common.downloadResume}
                size="large" 
            >
                {t.common.downloadResume}
            </Button>
        </div>
    );
}

export default ViableResume;
