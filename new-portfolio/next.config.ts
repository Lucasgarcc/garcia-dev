
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    forceSwcTransforms: true,
  },

    webpack(config: any) {
    // Encontra a regra que carrega arquivos que contenham SVG, protegendo o acesso a test
    const fileLoaderRule = config.module.rules.find(
        (rule: any) => rule.test instanceof RegExp && rule.test.test('.svg')
    );

    if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
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
                        Stroke: 'currentColor',
                        stop: {
                            stopColor: 'currentColor',
                            offset: '0%' 
                        },
                    },
                },
            },
        ],
    });

    return config;
    }

};

export default nextConfig;
