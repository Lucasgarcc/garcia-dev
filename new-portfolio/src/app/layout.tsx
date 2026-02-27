// app/layout.tsx
import './globals.css';
import { Roboto_Mono} from 'next/font/google';
import type { ReactNode } from 'react';
import Header from './components/Header/Header';
import LaserBackground from './components/Background/LaserBackground/LaserBackground';
import localFont from "next/font/local";
import Providers from './Providers';
import Footer from './components/Footer/Footer';

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
                <meta name="description" content="Portfólio pessoal com animações 3D e projetos modernos" />
                <meta name="keywords" content="portfólio, desenvolvedor, frontend, projetos, animações 3D" />
                <meta name="author" content="Lucas Garcia" />
                <meta property="og:title" content="Meu Portfólio" />
                <meta property="og:description" content="Portfólio pessoal com animações 3D e projetos modernos" />
            </head>
            <body  className={`${robotoMono.variable} ${gugi.variable}`}>

                <Providers>
                    <LaserBackground />
                    <header>
                        <Header />
                    </header>
    
                    <main>
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
