'use client';
'../../../../styles/globals.css';
import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import Style from './CodeCard.module.css';


const CodeCard = () => {

    const [writing, setWriting] = useState(false);


    const [rotation, setRotation] = useState({ x: 0, y: 0 });


    const handleWrite = () => {
        if (writing) return;       
        setWriting(true);
    }

    // Conteúdo HTML do bloco de código, formatado como uma string para evitar erros de sintaxe JSX
  
    const codeContent = `
        <span class="${Style.Comment}">
// Mais do que programar,  
// eu transformo ideias em experiências.
</span><br />  <span class="${Style.Keyword}">import</span> { <span class="${Style.Component}">React</span>, <span class="${Style.Function}">useState</span> } <span class="${Style.Keyword}">from</span> <span class="${Style.String}">'react'</span>;<br /><br />  <span class="${Style.Keyword}">const</span> <span class="${Style.Component}">MyDeveloperCard</span> = () => {<br />&nbsp;&nbsp;<span class="${Style.Keyword}">const</span> [<span class="${Style.Prop}">status</span>, <span class="${Style.Function}">setStatus</span>] = <span class="${Style.Function}">useState</span>(<span class="${Style.String}">'Online'</span>);<br /><br />&nbsp;&nbsp;<span class="${Style.Keyword}">return</span> (<br /> 
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="${Style.Component}">div</span> <span class="">className</span>=<span class="${Style.String}">"card"</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="${Style.Component}">h1</span>&gt;Hello Word!&lt;/<span class="${Style.Component}">h1</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="${Style.Component}">p</span>&gt;Desenvolvendo a próxima grande ideia.&lt;/<span class="${Style.Component}">p</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span class="${Style.Component}">div</span>&gt;<br />
         &nbsp;&nbsp;);<br />  };<br /><br/> <span class="${Style.Keyword}">export default</span> <span class="${Style.Component}">MyDeveloperCard</span>;
    `
    
    
    return (
        <>
        <section className="flex relative items-center  justify-center">
            {/* Os gradientes permanecem fora do card para serem posicionados no fundo. */}
            <div className={`${Style.GradientSpot} ${Style.GradientSpot1}`}></div>
            <div className={`${Style.GradientSpot} ${Style.GradientSpot2}`}></div>
            
            {/* Este é o novo contêiner principal do card, que irá gerenciar a proporção e a sombra. */}
            <div className={`${Style.CodeCardWrapper}`}>
                 <div className={Style.CircularShadow}></div>
                {/* Seção do código. */}
                <div className={`${Style.ContentSection} bg-[#111111]`}>
                <div className={Style.CodeContainer} dangerouslySetInnerHTML={{ __html: codeContent }}/>
                </div>

                {/* Seção dos anéis gráficos. */}
                <div className={`${Style.ContentSection} relative`}>
                <div className="absolute inset-0  bg-[#111111] z-10">
                    <div className="absolute w-full h-full">
                    <div className={`absolute ${Style.GraphicRing} rounded-full`} style={{ top: '20%', right: '10%', width: '150px', height: '150px' }}></div>
                    <div className="absolute GraphicRing rounded-full opacity-60" style={{ top: '50%', right: '0', width: '250px', height: '250px' }}></div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </>
    );
};

export default CodeCard;