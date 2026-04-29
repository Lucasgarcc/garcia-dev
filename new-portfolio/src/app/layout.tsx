// app/layout.tsx
import './globals.css';
import { Aldrich, Roboto_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import Header from '@/app/_components/layout/Header/Header';
import LaserBackground from '@/app/_components/layout/Background/LaserBackground/LaserBackground';
import localFont from "next/font/local";
import Providers from './Providers';
import Footer from '@/app/_components/layout/Footer/Footer';

const gugi = localFont({
    src: [
        {
            path: './fonts/Gugi/Gugi-Regular.ttf',
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-title",
});

export const metadata = {
    title: 'Garcia Developer',
    description: 'Site profissional de Lucas Garcia, desenvolvedor Frontend.',
};

const aldric = Aldrich({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-altric',
    display: 'swap',
})

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto-mono',
    display: 'swap',
});

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
                <meta name="description" content="Portfólio pessoal com designer profissional e projetos modernos" />
                <meta name="keywords" content="portfólio, desenvolvedor, frontend, projetos, animações 3D" />
                <meta name="author" content="Lucas Garcia" />
                <meta property="og:title" content="Meu Portfólio" />
                <meta property="og:description" content="Portfólio pessoal com animações 3D e projetos modernos" />
            </head>
            <body suppressHydrationWarning className={`${robotoMono.variable} ${aldric.variable} ${gugi.variable}`}>

                <Providers>
                    {/* O Wrapper envolve tudo o que deve aparecer após o loading */}

                    <LaserBackground />
                    <header>
                        <Header />
                    </header>

                    <main className='mainLayout'>
                        {children}
                    </main>

                    <Footer />

                </Providers>
            </body>
        </html>
    );
}
