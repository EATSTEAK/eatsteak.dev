import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import compress from "astro-compress";

import sectionize from "@hbsnow/rehype-sectionize";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { remarkCallout } from "@r4ai/remark-callout";
import pager from "rehype-pager";

// https://astro.build/config
export default defineConfig({
  site: "https://eatsteak.dev",
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    tailwind({
      applyBaseStyles: false,
    }),
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
});
