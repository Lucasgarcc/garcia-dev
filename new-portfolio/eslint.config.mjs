import tseslint from "typescript-eslint";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": "warn", // Evita variáveis esquecidas
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off", // Não obriga return type
      // React / Next
      "react/react-in-jsx-scope": "off", // Não necessário no Next.js
      "react/no-unescaped-entities": "off", // Permite caracteres como apóstrofos diretos
      "@next/next/no-page-custom-font": "off", // Libera uso manual de fontes
      "react-hooks/refs": "off", // Permite refs de seção usadas na navegação
    },
  },
];

export default eslintConfig;
