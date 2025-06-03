// app/layout.tsx
import './globals.css';

import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import Header from './components/Home/Header/Header';
import MainLayout from './components/Home/Main/Main';
import LaserBackground from './components/Background/LaserBackground/LaserBackground';
// import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Meu Portfólio',
    description: 'Portfólio pessoal com animações 3D e projetos modernos',
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="pt-br">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Portfólio pessoal com animações 3D e projetos modernos" />
                <meta name="keywords" content="portfólio, desenvolvedor, frontend, projetos, animações 3D" />
                <meta name="author" content="Lucas Garcia" />
                <meta property="og:title" content="Meu Portfólio" />
                <meta property="og:description" content="Portfólio pessoal com animações 3D e projetos modernos" />
            </head>
            <body className={inter.className} >
                <LaserBackground />
                <Header />
                <main>
                <MainLayout> {children} </MainLayout>
                </main>
            </body>
        </html>
    );
}
