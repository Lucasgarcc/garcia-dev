import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        forceSwcTransforms: true,
    },

    webpack(config) {
        // Localiza a regra padrão do Next.js que gerencia SVGs para excluí-la
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'),
        );

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        //  Adiciona as novas regras separadas
        config.module.rules.push(
  
            {
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
                type: 'asset/resource',
                generator: {
                    filename: 'static/chunks/images/[name].[hash][ext]',
                },
            },
            {
                test: /\.md$/,
                type: 'asset/source', // Isso faz o Next.js ler o .md como string pura
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /url/] },
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'removeViewBox',
                                        active: false,
                                    },
                                ],
                            },
                            svgProps: {
                                fill: 'currentColor',
                                stroke: 'currentColor'
                            },
                        },
                    },
                ],
            },
        );

        return config;
    },
};

export default nextConfig;