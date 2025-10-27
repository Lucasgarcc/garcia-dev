'use client'

import React from 'react'
import '../../../globals.css';
import Style from './Logo.module.css'
import LogoSvg from '@/assets/logo.svg';
import { LogoProps } from '@/app/types/logo';


const Logo = ({className = '', style = {}}: LogoProps ) => {

    return (

        <div className={`${className}`} style={style}>      
            <LogoSvg
                alt="Logo" width={100}
                height={100} 
                className={`${Style.logo} ${Style.path1} ${Style.path2} ${Style.path3} ${Style.paint_linear} $ `} 
                id ={Style.paint_linear}
            />
        </div>
    )
};

export default Logo;