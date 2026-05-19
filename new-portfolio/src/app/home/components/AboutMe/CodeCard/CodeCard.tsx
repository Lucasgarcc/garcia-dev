'use client';
import Style from './CodeCard.module.css';
import TypingEffect from '@/app/_components/ui/Animations/TypingEffect/TypingEffect';

const CodeCard = () => {

    // Conteúdo HTML do bloco de código, formatado como uma string para evitar erros de sintaxe JSX
  
    const codeContent = `
        <span class="${Style.Comment}">
  // Mais do que programar,  
  // eu transformo ideias em experiências.
    </span><br />  <span class="${Style.Keyword}">import</span> { <span class="${Style.Component}">React</span>, <span class="${Style.Function}">useState</span> } <span class="${Style.Keyword}">from</span> <span class="${Style.String}">'react'</span>;<br /><br />  <span class="${Style.Keyword}">const</span> <span class="${Style.Component}">MyDeveloperCard</span> = () => {<br />&nbsp;&nbsp;<span class="${Style.Keyword}">const</span> [<span class="${Style.Prop}">status</span>, <span class="${Style.Function}">setStatus</span>] = <span class="${Style.Function}">useState</span>(<span class="${Style.String}">'Online'</span>);<br /><br />&nbsp;&nbsp;<span class="${Style.Keyword}">return</span> (<br /> 
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="${Style.Component}">div</span> <span class="">className</span>=<span class="${Style.String}">"card"</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="${Style.Component}">h1</span>&gt;Hello Word!&lt;/<span class="${Style.Component}">h1</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="${Style.Component}">p</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Desenvolvendo a próxima grande ideia.<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&lt;/<span class="${Style.Component}">p</span>&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span class="${Style.Component}">div</span>&gt;<br />
    &nbsp;&nbsp;  );<br />  };<br /><br/> <span class="${Style.Keyword}">export default</span> <span class="${Style.Component}">MyDeveloperCard</span>;
    `
    
    
    return (
        <>
            <section className={`${Style.CodeSectionContainer} flex relative items-center  justify-center`}>
                {/* Os gradientes permanecem fora do card para serem posicionados no fundo. */}
                <div className={`${Style.GradientSpot} ${Style.GradientSpot1}`}></div>
                <div className={`${Style.GradientSpot} ${Style.GradientSpot2}`}></div>
                
                {/* Este é o novo contêiner principal do card, que irá gerenciar a proporção e a sombra. */}
                <div className={`${Style.CodeCardWrapper}`}>
                    <div className={Style.CircularShadow}></div>
                    {/* Seção do código. */}
                    <div className={`${Style.ContentSection} bg-[#111111]`}>
                    <div className={Style.CodeContainer}>
                        <TypingEffect text={codeContent} />
                    </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default CodeCard;
