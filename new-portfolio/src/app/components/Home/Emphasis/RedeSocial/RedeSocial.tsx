//@ components/HomeSocial.js
'use client';
import Styles from './RedeSocial.module.css';
import { FiGithub } from 'react-icons/fi';
import { RxDiscordLogo } from "react-icons/rx";
import { RiLinkedinLine } from "react-icons/ri";
import { redesocial } from '@/app/types/redesocial';
import { red } from '@mui/material/colors';

interface HomeSocialProps {
  redesocial: redesocial;
}

const HomeSocial = ({redesocial}: HomeSocialProps) => {
    return (
        <section>
            <div 
                className={
                    `${
                        redesocial.className !== '' 
                        ? redesocial.className 
                        : Styles.contentIcon 
                    }`
                } 
                role="navigation"
                aria-label="Redes sociais"
            >
                <a href="https://www.linkedin.com/in/lucas-garcia-l/" target="_blank" aria-label="Perfil no LinkedIn">
                    <RiLinkedinLine 
                        className={Styles.Icon} 
                        size={
                            `${
                                redesocial.fontSize !== 0 
                                ? redesocial.fontSize 
                                : 30
                            }`
                        } 
                        strokeWidth={1.1}
                    />
                </a>

                <a href="https://lucasgarcia0589" aria-label="Perfil no Discord">
                    <RxDiscordLogo 
                        className={`${Styles.Icon} ${Styles.IconEmph} `} 
                        size={
                            `${
                                redesocial.fontSize !== 0 
                                ? redesocial.fontSize 
                                : 30
                            }`
                        } 
                    />
                </a>

                <a href="https://github.com/Lucasgarcc" target="_blank" aria-label="Perfil no GitHub">
                    <FiGithub 
                        className={Styles.Icon} 
                        size={`
                            ${
                                redesocial.fontSize !== 0 
                                ? redesocial.fontSize 
                                : 30
                            }
                        `}
                    />
                </a>
            </div>
        </section>
    );
};

export default HomeSocial;
