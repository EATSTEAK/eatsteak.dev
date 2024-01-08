import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

import { remarkReadingTime } from "./reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://eatsteak.dev",
  integrations: [mdx(), sitemap(), solidJs(), tailwind()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
