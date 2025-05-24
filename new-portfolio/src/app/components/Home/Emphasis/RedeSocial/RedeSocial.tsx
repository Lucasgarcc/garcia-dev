//@ components/HomeSocial.js
'use client';
import Styles from './RedeSocial.module.css';
import { FaLinkedinIn} from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { RxDiscordLogo } from "react-icons/rx";

const HomeSocial = () => {
  return (
    <>
    <div  className={Styles.contentIcon} role="navigation" aria-label="Redes sociais">
        <a href="https://www.linkedin.com/in/lucas-garcia-l/" target="_blank" aria-label="Perfil no LinkedIn">
          <FaLinkedinIn size={30}  color="#388E3C" />
        </a>

        <a href="https://lucasgarcia0589"aria-label="Perfil no Discord">
          <RxDiscordLogo size={30} color="#8BC34A" />
        </a>

        <a href="https://github.com/Lucasgarcc" target="_blank" aria-label="Perfil no GitHub">
          <FiGithub size={30} color="#388E3C" />
        </a>
      </div>
      </>
  );
};

export default HomeSocial;
