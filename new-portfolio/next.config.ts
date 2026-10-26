import type { NextConfig } from 'next';

type WebpackRule = {
    test?: RegExp;
    exclude?: RegExp;
    issuer?: string | RegExp;
    resourceQuery?: { not?: (RegExp | string)[] };
};

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        forceSwcTransforms: true,
    },

    webpack(config) {
        // Localiza a regra padrão do Next.js que gerencia SVGs para excluí-la
        const fileLoaderRule = (config.module.rules as unknown[]).find((rule: unknown) => {
            if (typeof rule !== 'object' || rule === null || !('test' in rule)) {
                return false;
            }

            const candidate = rule as WebpackRule;
            return candidate.test instanceof RegExp && candidate.test.test('.svg');
        }) as WebpackRule | undefined;

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/i;
        }

        const fileLoaderIssuer = fileLoaderRule?.issuer;
        const fileLoaderResourceQuery = fileLoaderRule?.resourceQuery?.not ?? [];

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
                issuer: fileLoaderIssuer,
                resourceQuery: { not: [...fileLoaderResourceQuery, /url/] },
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
