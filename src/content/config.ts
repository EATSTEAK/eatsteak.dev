import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    topics: z.array(z.string()).optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    hidden: z.boolean().optional(),
    series: z.string().optional(),
  }),
});

const slide = defineCollection({
  // Type-check frontmatter using a schema
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
