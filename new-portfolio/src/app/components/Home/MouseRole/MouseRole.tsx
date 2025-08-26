'use client';
import '../../../globals.css';
import Sytles from './MouseRole.module.css'; 

import react from 'react';

import { TbMouseFilled } from "react-icons/tb";
import { RiArrowDownSLine } from 'react-icons/ri';
// import SwipeDownIcon from '@mui/icons-material/SwipeDown';

const MouseRole = () => {
    return (
        <div className={Sytles.ContainerMouseRole}>
            <TbMouseFilled size={35} color={'var(--primary-c-0-3)'} />
            <span className="text-xs text-gray-500">Role para baixo...</span>
            <RiArrowDownSLine  size={28} color={'var(--primary-c-3)'} />
        </div>
    )
}

export default MouseRole;