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
  {
    // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
    files: [
      "**/*.astro/*.js",
      "*.astro/*.js",
      "**/*.astro/*.ts",
      "*.astro/*.ts",
    ],
    rules: {
      "prettier/prettier": "off",
    },
  },
);
