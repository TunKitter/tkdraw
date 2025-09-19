import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  tseslint.configs.recommended,
  {
    files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"], rules: {
      "css/use-baseline": "off",
    }
  },
  {
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-use-before-define": "error",
      "no-eval": "error",
      "no-useless-catch": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    }
  }
]);
