//@ components/HomeSocial.js
'use client';
import Styles from './RedeSocial.module.css';
import { FiGithub } from 'react-icons/fi';
import { RxDiscordLogo } from "react-icons/rx";
import { RiLinkedinLine } from "react-icons/ri";
const HomeSocial = () => {
  return (
    <section>
      <div className={Styles.contentIcon} role="navigation" aria-label="Redes sociais">
        <a href="https://www.linkedin.com/in/lucas-garcia-l/" target="_blank" aria-label="Perfil no LinkedIn">
          <RiLinkedinLine className={Styles.Icon} size={30} strokeWidth={1.1} />
        </a>

        <a href="https://lucasgarcia0589" aria-label="Perfil no Discord">
          <RxDiscordLogo className={`${Styles.Icon} ${Styles.IconEmph} `}  size={30} />
        </a>

        <a href="https://github.com/Lucasgarcc" target="_blank" aria-label="Perfil no GitHub">
          <FiGithub className={Styles.Icon} size={30} />
        </a>
      </div>
    </section>
  );
};

export default HomeSocial;
