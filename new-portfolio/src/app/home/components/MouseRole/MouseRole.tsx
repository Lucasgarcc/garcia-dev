'use client';
import Styles from './MouseRole.module.css';
import React from 'react';
import { TbMouseFilled } from "react-icons/tb";
import { RiArrowDownSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
// import SwipeDownIcon from '@mui/icons-material/SwipeDown';

const MouseRole = () => {

    const handleScroll = () => {
        window.scrollBy({
            top: window.innerHeight * 0.7, // Rola 90% da altura da janela para baixo
            behavior: 'smooth',
        });

    };

    return (
        <motion.button
            type="button"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className={Styles.ContainerMouseRole}
            onClick={handleScroll}
            aria-label="Rolar para a próxima seção">
            <TbMouseFilled size={35} className={Styles.mouseIcon} />
            <span className={`${Styles.text} text-xs text-gray-500`}>Role para baixo...</span>
            <RiArrowDownSLine size={28} className={Styles.arrowIcon} />
        </motion.button>
    )
}

export default MouseRole;
