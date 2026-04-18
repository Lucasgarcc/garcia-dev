import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        forceSwcTransforms: true,
    },

    webpack(config) {
        // 1. Localiza a regra padrão do Next.js que gerencia SVGs para excluí-la
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.('.svg'),
        );

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        // 2. Adiciona as novas regras separadas
        config.module.rules.push(
            // Regra A: Quando o import terminar em ?url, trata como recurso estático (URL string)
            {
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
                type: 'asset/resource',
                generator: {
                    filename: 'static/chunks/images/[name].[hash][ext]',
                },
            },
            // Regra B: Quando o import NÃO tiver ?url, trata como Componente React (SVGR)
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