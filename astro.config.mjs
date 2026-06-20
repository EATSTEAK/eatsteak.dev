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

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createMermaidMarkup(value) {
  return `<div class="mermaid-wrapper"><pre class="mermaid" data-mermaid-pending>${escapeHtml(value)}</pre></div>`;
}

function transformMermaidCodeBlocks(node) {
  if (!node || typeof node !== "object") return;

  if (node.type === "code" && node.lang?.toLowerCase() === "mermaid") {
    node.type = "html";
    node.value = createMermaidMarkup(node.value ?? "");
    delete node.lang;
    delete node.meta;
    return;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      transformMermaidCodeBlocks(child);
    }
  }
}

function remarkMermaid() {
  return transformMermaidCodeBlocks;
}

// https://astro.build/config
export default defineConfig({
  site: "https://eatsteak.dev",
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    compress({
      CSS: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkCallout, remarkMermaid],
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
    css: {
      transformer: "lightningcss",
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
});
