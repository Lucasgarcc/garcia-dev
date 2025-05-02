//@ components/HomeSocial.js
'use client';
import Styles from './RedeSocial.module.css';
import { SlSocialLinkedin} from 'react-icons/sl';
import { FiGithub } from 'react-icons/fi';
import { RxDiscordLogo } from "react-icons/rx";

const HomeSocial = () => {
  return (
    <>
    <div  className={Styles.contentIcon} role="navigation" aria-label="Redes sociais">
        <a href="https://www.linkedin.com/in/lucas-garcia-l/" target="_blank" aria-label="Perfil no LinkedIn">
          <SlSocialLinkedin size={30} color="#fff00" />
        </a>

        <a href="https://lucasgarcia0589"aria-label="Perfil no Discord">
          <RxDiscordLogo size={30} color="#7289da" />
        </a>

        <a href="https://github.com/Lucasgarcc" target="_blank" aria-label="Perfil no GitHub">
          <FiGithub size={30} color="#fff00" />
        </a>
      </div>
      </>
  );
};

export default HomeSocial;
