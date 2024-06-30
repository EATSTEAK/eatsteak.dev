import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import compress from "astro-compress";

import sectionize from "@hbsnow/rehype-sectionize";
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://eatsteak.dev",
  integrations: [mdx(), sitemap(), solidJs(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress({
    CSS: false,
  })],
  markdown: {
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
      ]
    }
  }
});