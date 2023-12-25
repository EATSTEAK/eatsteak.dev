const defaultTheme = require("tailwindcss/defaultTheme");
const { CATEGORIES } = require("./src/consts");

const categoryColors = Object.fromEntries(
  Object.values(CATEGORIES).flatMap((category) => [
    [
      `category-${category.id}-bg`,
      {
        DEFAULT: category.color.light.bg,
        light: category.color.light.bg,
        dark: category.color.dark.bg,
      },
    ],
    [
      `category-${category.id}-text`,
      {
        DEFAULT: category.color.light.text,
        light: category.color.light.text,
        dark: category.color.dark.text,
      },
    ],
  ])
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        head: ['"Jost"', '"Noto Sans KR"', ...defaultTheme.fontFamily.sans],
        sans: ['"Noto Sans KR"', ...defaultTheme.fontFamily.sans],
        mono: ['"MonoplexKR"', ...defaultTheme.fontFamily.mono],
      },
      colors: categoryColors,
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text)-category-.+/,
      variants: ["dark"],
    },
  ],
};
