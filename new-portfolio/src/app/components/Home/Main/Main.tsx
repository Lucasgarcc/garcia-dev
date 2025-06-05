"use client";
import '../../../globals.css';
import { ReactNode } from 'react';

import Emphasis from '@/app/components/Home/Emphasis/Emphasis';
import RedeSocial from '@/app/components/Home/Emphasis/RedeSocial/RedeSocial';
import Scene3D from '@/app/components/Background/Scene3D';

import useViewAnimation from '@/hooks/EffectAnimation/EffectAnimation';
import AboutMe from '../AboutMe/AboutMe';

interface ClientLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: ClientLayoutProps) => {

  const { ref, isVisible } = useViewAnimation(0.2);

  return (
    <>
      <main ref={ref}   className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`} >
        {children}
      <div className="main-content">
        <div className="area-content-scene3D">
          <Scene3D />
        </div>
        <div className="areaContentRedeSocial">
          <div >
            <RedeSocial />
          </div>
        </div>
        <div className="area-content-emphasis">
          <Emphasis />
        </div>
      </div>
        <section className={ `area-content-about-me transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`} ref={ref}  >
          <AboutMe/>
        </section> 
      </main>

    </>
  );
}

export default MainLayout;