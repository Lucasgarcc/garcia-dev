'use client';
import '../../../globals.css';
import Styles from './MouseRole.module.css'; 
import React from 'react';
import { TbMouseFilled } from "react-icons/tb";
import { RiArrowDownSLine } from 'react-icons/ri';
import { useSmoothScroll } from '@/hooks/UseSmoothScroll/UseSmoothScroll';
import { motion } from 'framer-motion';
// import SwipeDownIcon from '@mui/icons-material/SwipeDown';

const MouseRole = () => {

    useSmoothScroll();

    const handleScroll = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <motion.div 
            initial={{opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1}}
            className={Styles.ContainerMouseRole} 
            onClick={handleScroll}>
            <TbMouseFilled size={35} className={Styles.mouseIcon} />
            <span className={`${Styles.text} text-xs text-gray-500`}>Role para baixo...</span>
            <RiArrowDownSLine  size={28} className={Styles.arrowIcon}/>
        </motion.div>
    )
}

export default MouseRole;