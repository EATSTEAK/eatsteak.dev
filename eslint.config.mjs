import eslint from "@eslint/js";
import solid from "eslint-plugin-solid/configs/typescript";
import astro from "eslint-plugin-astro";
import tsEslint from "typescript-eslint";
import prettierConfig from "eslint-plugin-prettier/recommended";

export default tsEslint.config(
  {
    ignores: [
      "dist",
      ".astro",
      ".obsidian",
      ".vscode",
      "node_modules",
      "public",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx,astro}"],
  },
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ...solid,
  },
  prettierConfig,
);
