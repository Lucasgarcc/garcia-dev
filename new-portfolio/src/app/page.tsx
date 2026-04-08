"use client";
import Skeleton from './components/ui/Skeleton/Skeleton';
import './globals.css';
import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('./home/MainLayout'), {
    loading: () => <Skeleton width="100%" height="100vh" />
});


export default function Page() {

    return <MainLayout />;

}

