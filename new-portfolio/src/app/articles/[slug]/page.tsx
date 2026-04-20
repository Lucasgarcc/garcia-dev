
import { posts } from '../data/posts';
import { notFound } from 'next/navigation';
import MainArticle from '../MainArticle';

export async function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) notFound();

    // Aqui você passa o post para a sua MainArticle 'use client'
    return <MainArticle post={post} />;
}