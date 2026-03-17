import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string().optional(),
      topics: z.array(z.string()).optional(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      thumbnail: image().optional(),
      hidden: z.boolean().optional(),
      series: z.string().optional(),
    }),
});

const slide = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/slide" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    topics: z.array(z.string()).optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    hidden: z.boolean().optional(),
    series: z.string().optional(),
  }),
});

export const collections = { blog, slide };
