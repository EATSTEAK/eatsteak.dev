import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import compress from "astro-compress";

import sectionize from "@hbsnow/rehype-sectionize";

// https://astro.build/config
export default defineConfig({
  site: "https://eatsteak.dev",
  integrations: [mdx(), sitemap(), solidJs(), tailwind(), compress({
    CSS: false,
  })],
  markdown: {
    rehypePlugins: [sectionize]
  }
});