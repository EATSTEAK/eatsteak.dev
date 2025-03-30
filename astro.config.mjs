import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import compress from "astro-compress";
import tailwindcss from "@tailwindcss/vite";

import sectionize from "@hbsnow/rehype-sectionize";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { remarkCallout } from "@r4ai/remark-callout";

// https://astro.build/config
export default defineConfig({
  site: "https://eatsteak.dev",
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    compress({
      CSS: true,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkCallout],
    rehypePlugins: [sectionize],
    remarkRehype: {
      footnoteLabel: "각주",
      footnoteBackLabel: "원문 보기",
    },
    shikiConfig: {
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
