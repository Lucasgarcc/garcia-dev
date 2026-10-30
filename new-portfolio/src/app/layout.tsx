// app/layout.tsx
import './globals.css';
import { Aldrich, Roboto_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Header from '@/app/_components/layout/Header/Header';
import LaserBackground from '@/app/_components/layout/Background/LaserBackground/LaserBackground';
import localFont from "next/font/local";
import Providers from './Providers';
import Footer from '@/app/_components/layout/Footer/Footer';
import ScrollToTop from '@/app/_components/ui/ScrollToTop/ScrollToTop';

const gugi = localFont({
    src: [
        {
            path: './fonts/Gugi/Gugi-Regular.ttf',
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-title",
    fallback: ['sans-serif'],
});

export const metadata = {
    title: 'Garcia Developer',
    description: 'Lucas Garcia - Desenvolvedor Frontend.',
};

const themeBootstrapScript = `
    (() => {
        try {
            const savedTheme = localStorage.getItem('portfolio-theme');
            const theme = savedTheme === 'dark' || savedTheme === 'light'
                ? savedTheme
                : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

            document.documentElement.dataset.theme = theme;
            document.documentElement.style.colorScheme = theme;

            const themeMeta = document.querySelector('meta[name="theme-color"]');
            themeMeta?.setAttribute('content', theme === 'dark' ? '#0d0d0d' : '#fdfdfd');
        } catch {
            document.documentElement.dataset.theme = 'light';
        }
    })();
`;

const aldric = Aldrich({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-altric',
    display: 'swap',
    fallback: ['sans-serif'],
})

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto-mono',
    display: 'swap',
    fallback: ['sans-serif'],
});

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="pt-br" data-theme="light" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#000000" />
                {/*<script
                    dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
                />*/}

                {/* SEO Principal */}
                <meta name="description" content="Explore o ecossistema de desenvolvimento de Lucas Garcia. Engenharia frontend, arquitetura modular, design systems e experiências digitais interativas." />
                <meta name="keywords" content="Lucas Garcia, frontend developer, engenheiro frontend, react, nextjs, web development, design systems, animações 3D web, performance web, javascript" />
                <meta name="author" content="Lucas Garcia" />

                {/* Open Graph */}
                <meta property="og:title" content="Lucas Garcia | Frontend Engineer" />
                <meta property="og:description" content="Desenvolvimento web focado em performance, interfaces ricas e arquitetura moderna. Conheça meus projetos e ecossistema de desenvolvimento." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://garciadev.vercel.app" />
            </head>
            <body className={`${robotoMono.variable} ${aldric.variable} ${gugi.variable}`}>
                <Providers>
                    {/* O Wrapper envolve tudo o que deve aparecer após o loading */}

                    <LaserBackground />
                    <header>
                        <Header />
                    </header>

                    <a className="skip-link" href="#main-content">Pular para o conteúdo principal</a>
                    <main id="main-content" className='mainLayout'>
                        {children}
                    </main>

                    <Footer />
                    <ScrollToTop />

                </Providers>
            </body>
        </html>
    );
}
