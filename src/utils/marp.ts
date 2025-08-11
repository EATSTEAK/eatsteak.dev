import { Marp } from "@marp-team/marp-core";

export interface ParsedSlide {
  html: string;
  index: number;
  notes?: string;
}

export interface SlideDocument {
  slides: ParsedSlide[];
  html: string; // Full document HTML for scrollable view
  css: string; // Generated CSS
  title?: string;
}

/**
 * Process image paths in HTML to work with Vite's asset system
 * Converts relative paths like ../../assets/image.png to proper Vite asset URLs
 */
function processImagePaths(
  html: string,
  imageMapping?: Record<string, string>,
): string {
  return html.replace(
    /<img([^>]+)src=["']([^"']+)["']([^>]*)>/g,
    (match, beforeSrc, src, afterSrc) => {
      // If the src is a relative path that goes to src/assets
      if (src.includes("../assets/") || src.includes("assets/")) {
        // Extract the filename from the path
        const filename = src.split("/").pop();

        // Use imageMapping to get the proper Vite asset URL
        if (filename && imageMapping && imageMapping[filename]) {
          const newSrc = imageMapping[filename];
          console.log(`[Marp] Mapping image: ${src} -> ${newSrc}`);
          return `<img${beforeSrc}src="${newSrc}"${afterSrc}>`;
        }

        // Fallback: if no mapping found, try public assets path
        if (filename) {
          const newSrc = `/assets/${filename}`;
          console.log(`[Marp] Fallback mapping: ${src} -> ${newSrc}`);
          return `<img${beforeSrc}src="${newSrc}"${afterSrc}>`;
        }
      }

      // If the src already starts with /assets/ or is absolute/external, keep as is
      if (
        src.startsWith("/assets/") ||
        src.startsWith("http") ||
        src.startsWith("data:") ||
        src.startsWith("/_astro/")
      ) {
        return match;
      }

      return match;
    },
  );
}

/**
 * Parse and render markdown content using Marp
 */
export function renderMarpSlides(
  markdown: string,
  imageMapping?: Record<string, string>,
): SlideDocument {
  const marp = new Marp({
    html: true,
    markdown: {
      breaks: true,
    },
  });

  // Render the full document
  const result = marp.render(markdown);

  // Process image paths in the rendered HTML using Vite asset mapping
  const processedHtml = processImagePaths(result.html, imageMapping);

  // Extract individual slides from the processed HTML
  const slides: ParsedSlide[] = [];

  // Parse the HTML to find individual section elements (slides)
  const sectionRegex = /<section[^>]*>[\s\S]*?<\/section>/g;
  let match;
  let index = 0;

  while ((match = sectionRegex.exec(processedHtml)) !== null) {
    slides.push({
      html: match[0], // Include the full section tag with processed image paths
      index,
    });
    index++;
  }

  return {
    slides,
    html: processedHtml, // Use processed HTML with corrected image paths
    css: result.css,
  };
}

/**
 * Extract slide content from markdown (removing frontmatter)
 */
export function extractSlideContent(markdown: string): string {
  // Remove frontmatter
  if (markdown.trim().startsWith("---")) {
    const frontmatterEnd = markdown.indexOf("---", 3);
    if (frontmatterEnd !== -1) {
      return markdown.substring(frontmatterEnd + 3).trim();
    }
  }
  return markdown;
}
