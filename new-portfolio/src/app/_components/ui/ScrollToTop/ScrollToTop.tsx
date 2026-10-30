'use client';

import { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SHOW_AFTER = 320;

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > SHOW_AFTER);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    };

    return (
        <Fade in={isVisible} timeout={240} unmountOnExit>
            <Fab
                size="medium"
                color="inherit"
                onClick={scrollToTop}
                aria-label="Voltar ao topo"
                title="Voltar ao topo"
                sx={{
                    position: 'fixed',
                    right: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                    bottom: {
                        xs: 'calc(1rem + env(safe-area-inset-bottom))',
                        sm: '1.5rem',
                    },
                    width: { xs: 44, sm: 50 },
                    height: { xs: 44, sm: 50 },
                    minHeight: 0,
                    zIndex: 2500,
                    color: '#f5f5f5',
                    backgroundColor: 'rgba(18, 18, 18, 0.94)',
                    border: '1px solid #595959',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)',
                    transition: 'transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                        backgroundColor: '#595959',
                        borderColor: '#8e8e93',
                        color: '#ffffff',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
                    },
                    '&:focus-visible': {
                        outline: '3px solid var(--green-limon)',
                        outlineOffset: 3,
                    },
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Fade>
    );
}
