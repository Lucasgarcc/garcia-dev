import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended" // Adiciona boas práticas de TS
  ),
  ...compat.config({
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true, // Ativa detecção baseada no tsconfig
      },
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": "warn", // Evita variáveis esquecidas
      "@typescript-eslint/explicit-function-return-type": "off", // Não obriga return type
      // React / Next
      "react/react-in-jsx-scope": "off", // Não necessário no Next.js
      "react/no-unescaped-entities": "off", // Permite caracteres como apóstrofos diretos
      "@next/next/no-page-custom-font": "off", // Libera uso manual de fontes
    },
  }),
];

export default eslintConfig;
