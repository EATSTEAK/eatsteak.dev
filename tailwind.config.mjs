const defaultTheme = require("tailwindcss/defaultTheme");

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
    },
  },
  plugins: [],
};
