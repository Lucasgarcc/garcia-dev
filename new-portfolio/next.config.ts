
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,

  experimental: {
    forceSwcTransforms: true,
  },

    webpack(config: { module?: { rules: unknown[] } }) {
    // Encontra a regra que carrega arquivos que contenham SVG, protegendo o acesso a test
    const fileLoaderRule = config.module?.rules.find(
        (rule): rule is { test: RegExp; exclude?: RegExp } => {
            const candidate = rule as { test?: unknown };
            return candidate.test instanceof RegExp && candidate.test.test('.svg');
        }
    );

    if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module!.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
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
    });

    return config;
    }

};

export default nextConfig;
