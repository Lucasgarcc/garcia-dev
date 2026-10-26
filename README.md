# Lucas Garcia · Desenvolvedor Front-end Júnior

Portfólio pessoal criado do zero com **Next.js** e TypeScript para apresentar quem sou, minha trajetória em tecnologia, os projetos que já desenvolvi e os artigos que considero importantes na minha evolução profissional.

O site foi construído como uma experiência autoral: possui identidade visual própria, com cores, tipografia, composição e interações pensadas especificamente para representar meu trabalho.

## ✨ O que você encontra no site

- apresentação pessoal, trajetória e principais habilidades;
- projetos já desenvolvidos, com seus contextos, tecnologias e links relacionados;
- artigos técnicos sobre temas importantes na minha visão;
- navegação por seções com animações e interações baseadas em scroll;
- tema claro e escuro integrado à preferência do sistema;
- layout responsivo para diferentes tamanhos de tela.

### Experiência na área de projetos

A seção de projetos foi pensada para ir além de uma lista de cards. Ela apresenta uma transição visual entre uma representação **2D em formato de árvore**, inspirada no graph de commits do Git, e uma experiência **3D interativa**, na qual os projetos podem ser explorados visualmente.

Essa escolha transforma a navegação em parte da narrativa do portfólio, relacionando código, evolução e os projetos que construí ao longo da minha trajetória.

## 🧰 Stack

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript e JavaScript
- **Front-end:** React, HTML e CSS Modules
- **Interface:** Material UI (MUI), Emotion e React Icons
- **Animação:** GSAP e Framer Motion
- **Experiência visual:** Zdog, Three.js e React Three Fiber
- **Conteúdo:** Markdown com `react-markdown` e `remark-gfm`

## 🧩 Organização do projeto

O conteúdo e a interface foram separados para facilitar a evolução do site. A área de projetos já possui uma estrutura própria de dados e componentes, permitindo substituir os dados locais por uma API futuramente sem precisar reconstruir toda a experiência visual.

Os artigos também ficam organizados como conteúdo independente em Markdown, mantendo a publicação de novos textos simples e desacoplada da estrutura principal da página.

## 🏗️ Arquitetura

O projeto segue uma organização inspirada em **Clean Architecture**, combinada com uma estrutura por funcionalidades. A separação mantém dados, regras de apresentação e componentes visuais mais independentes, facilitando a evolução da aplicação.

- `app/`: rotas, layouts e composição das páginas com o App Router;
- `home/`: seções e componentes da página inicial;
- `projects/`: dados, contexto e experiências relacionadas aos projetos;
- `articles/`: artigos, conteúdo em Markdown e componentes de leitura;
- `_components/`: componentes reutilizáveis de layout e interface;
- `core/`: contextos, hooks, interfaces e abstrações compartilhadas;
- `public/` e `assets/`: imagens, fontes, ícones e recursos visuais.
- `next.config.ts`: regras de build para importar SVGs como componentes ou assets e carregar arquivos Markdown como conteúdo.

Essa organização também prepara a área de projetos para uma futura integração com API: os dados podem ser substituídos sem reconstruir toda a experiência visual.

## 🎨 UI/UX

A interface segue uma direção de **minimalismo tecnológico**, também próxima do conceito de **clean tech**, mas com uma camada experimental inspirada no universo do desenvolvimento. A experiência combina espaços amplos, navegação discreta, bordas arredondadas, tipografia com personalidade e uma paleta neutra marcada pelo verde-limão.

As decisões de experiência incluem:

- hierarquia clara para apresentar primeiro quem sou, depois minha trajetória, habilidades, projetos e artigos;
- navegação contextual, com menus que acompanham o conteúdo apresentado em cada área;
- alternância entre uma apresentação clara e arejada e uma área de projetos mais escura e imersiva;
- tipografia, símbolos de código, elementos geométricos e ilustrações que reforçam a identidade tecnológica;
- cartões com contraste de cor, cantos arredondados e chamadas de ação objetivas;
- animações baseadas em scroll para orientar a leitura sem competir com o conteúdo;
- componentes de habilidades em formato expansível para revelar informações progressivamente;
- tema claro e escuro e layout responsivo para diferentes dispositivos.

A árvore 2D inspirada no graph do Git comunica organização e evolução do código. A transição para o espaço 3D transforma essa mesma ideia em uma exploração mais livre e interativa dos projetos, com uma interface de detalhes que apresenta contexto, tecnologias e links relacionados.

## 📫 Contato

- [LinkedIn](https://www.linkedin.com/in/lucas-garcia-l/)
- [GitHub](https://github.com/LucasGarcc)

Este site representa minha forma de unir desenvolvimento front-end, design e narrativa visual para apresentar meu trabalho.

