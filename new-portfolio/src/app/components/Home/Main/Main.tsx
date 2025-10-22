'use client';

import '../../../globals.css';
import { ReactNode } from 'react';

import Emphasis from '@/app/components/Home/Emphasis/Emphasis';
import RedeSocial from '@/app/components/Home/Emphasis/RedeSocial/RedeSocial';
import Scene3D from '@/app/components/Background/Scene3D';
import useViewAnimation from '@/hooks/EffectAnimation/EffectAnimation';
import AboutMe from '../AboutMe/AboutMe';
import MouseRole from '../MouseRole/MouseRole';
import Timeline from '../Timeline/Timeline';
import Differential from '../Differential/Differential';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { ref, isVisible } = useViewAnimation(0.2);

  return (
    <main className="main-layout">
      {children}

      {/* Seção principal animada */}
      <section className="main-content">
        <div className="area-content-scene3D">
          <Scene3D />
        </div>

        <div className="areaContentRedeSocial"  ref={ref}>
          <RedeSocial redesocial={{ className: '', fontSize: 0}} />
        </div>

        <div className="area-content-emphasis">
          <Emphasis />
          <MouseRole />
        </div>

      </section>

      {/* Sobre mim */}
      <section
        className={`area-content-about-me transition-all duration-800 ${
          isVisible
            ? ' opacity-0 translate-x-10' 
            : ' opacity-100 translate-x-0'
        }`} >
        <AboutMe  />
      </section>

      {/* Linha do tempo */}
      <section
        className={`area-continer-timeline transition-all duration-800 ${
          isVisible
            ? ' opacity-0 translate-x-10' 
            : ' opacity-100 translate-x-0'
        }`}>
        <div className='area-content-timeline'></div>
            <div className="timeline-wrapper">
                <Timeline /> {/* ou o conteúdo com tabs etc */}
            </div>
      </section>

	   	{/* Diferencial */}
		<section
			className={`area-continer-differential transition-all duration-800 ${
			isVisible
				? ' opacity-0 translate-x-10' 
				: ' opacity-100 translate-x-0'
			}`}>
			<div className='area-content-diffential'>
				
				<Differential />
			</div>
		</section>
    </main>

  );
};

export default MainLayout;
