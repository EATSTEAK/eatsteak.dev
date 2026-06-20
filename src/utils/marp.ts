import { Marp } from "@marp-team/marp-core";
import { JSDOM } from "jsdom";
import { normalizeMermaidDocument } from "@/utils/mermaid";

export type ImageAssetMap = Record<string, string>;

type ImageAssetModule = {
  default: {
    src: string;
  };
};

export interface ParsedSlide {
  html: string;
  sectionHtml: string;
  svgHtml: string;
  id: string;
  index: number;
  firstHeadingText?: string;
  notes?: string;
}

export interface SlideDocument {
  slides: ParsedSlide[];
  html: string; // Full document HTML for scrollable view
  presentationHtml: string; // SVG slides for presentation view
  css: string; // Generated CSS
  title?: string;
}

type RenderMarpOptions = {
  imageMap?: ImageAssetMap;
  slideIdPrefix?: string;
};

const ASSET_IMPORT_PREFIX = "/src/assets/";
const ASSET_REFERENCE_MARKER = "assets/";

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

function splitPathAndSuffix(src: string): { path: string; suffix: string } {
  const suffixIndex = src.search(/[?#]/);

  if (suffixIndex === -1) {
    return { path: src, suffix: "" };
  }

  return {
    path: src.slice(0, suffixIndex),
    suffix: src.slice(suffixIndex),
  };
}

function isExternalOrResolvedPath(path: string): boolean {
  return (
    /^[a-z][a-z\d+.-]*:/i.test(path) ||
    path.startsWith("//") ||
    path.startsWith("/_astro/") ||
    (path.startsWith("/") && !path.startsWith(ASSET_IMPORT_PREFIX))
  );
}

function normalizeImportedAssetPath(path: string): string | undefined {
  const normalizedPath = normalizePath(path);

  if (!normalizedPath.startsWith(ASSET_IMPORT_PREFIX)) {
    return undefined;
  }

  return normalizedPath.slice(ASSET_IMPORT_PREFIX.length);
}

function normalizeRenderedAssetReference(src: string): string | undefined {
  const { path } = splitPathAndSuffix(src);
  const normalizedPath = normalizePath(path);

  if (isExternalOrResolvedPath(normalizedPath)) {
    return undefined;
  }

  if (normalizedPath.startsWith(ASSET_IMPORT_PREFIX)) {
    return normalizedPath.slice(ASSET_IMPORT_PREFIX.length);
  }

  const assetMarkerIndex = normalizedPath.lastIndexOf(ASSET_REFERENCE_MARKER);

  if (assetMarkerIndex === -1) {
    return undefined;
  }

  return normalizedPath.slice(assetMarkerIndex + ASSET_REFERENCE_MARKER.length);
}

export function createImageAssetMap(
  images: Record<string, ImageAssetModule>,
): ImageAssetMap {
  const imageMap: ImageAssetMap = {};

  for (const [path, module] of Object.entries(images)) {
    const assetPath = normalizeImportedAssetPath(path);

    if (assetPath) {
      imageMap[assetPath] = module.default.src;
    }
  }

  return imageMap;
}

function processImageElements(
  document: Document,
  imageMap?: ImageAssetMap,
): void {
  if (!imageMap) return;

  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>("img[src]"),
  );

  for (const image of images) {
    const src = image.getAttribute("src");
    if (!src) continue;

    const assetPath = normalizeRenderedAssetReference(src);
    if (!assetPath) continue;

    const mappedSrc = imageMap[assetPath];
    if (!mappedSrc) continue;

    const { suffix } = splitPathAndSuffix(src);
    image.setAttribute("src", `${mappedSrc}${suffix}`);
  }
}

function getDirectChildByTagName(
  element: Element,
  tagName: string,
): Element | undefined {
  return Array.from(element.children).find(
    (child) => child.tagName.toLowerCase() === tagName,
  );
}

function getSlideSections(document: Document): HTMLElement[] {
  const slideSections: HTMLElement[] = [];
  const slideSvgs = Array.from(
    document.querySelectorAll("svg[data-marpit-svg]"),
  );

  for (const svg of slideSvgs) {
    const foreignObject = getDirectChildByTagName(svg, "foreignobject");
    const section = foreignObject
      ? getDirectChildByTagName(foreignObject, "section")
      : undefined;

    if (section) {
      slideSections.push(section as HTMLElement);
    }
  }

  return slideSections;
}

function getSlideSvg(section: Element): Element | undefined {
  let current = section.parentElement;

  while (current) {
    if (
      current.tagName.toLowerCase() === "svg" &&
      current.hasAttribute("data-marpit-svg")
    ) {
      return current;
    }

    current = current.parentElement;
  }

  return undefined;
}

function extractFirstHeadingText(section: Element): string | undefined {
  const heading = section.querySelector("h1, h2, h3, h4, h5, h6");
  const text = heading?.textContent?.trim();

  return text || undefined;
}

function decorateSlideSections(
  slideSections: HTMLElement[],
  slideIdPrefix: string,
): void {
  slideSections.forEach((section, index) => {
    const slideId = `${slideIdPrefix}-${index}`;
    const originalId = section.getAttribute("id");

    if (originalId && originalId !== slideId) {
      section.setAttribute("data-marp-original-id", originalId);
    }

    section.setAttribute("id", slideId);
    section.setAttribute("data-slide-index", String(index));
  });
}

function buildPresentationHtml(slideSections: HTMLElement[]): string {
  return slideSections
    .map((section, index) => {
      const svg = getSlideSvg(section);
      if (!svg) return "";

      const clone = svg.cloneNode(true) as Element;
      clone.classList.add("slide");

      if (index === 0) {
        clone.classList.add("active");
      } else {
        clone.classList.remove("active");
      }

      return clone.outerHTML;
    })
    .join("");
}

/**
 * Parse and render markdown content using Marp
 */
export function renderMarpSlides(
  markdown: string,
  options: RenderMarpOptions = {},
): SlideDocument {
  const { imageMap, slideIdPrefix = "slide" } = options;
  const marp = new Marp({
    html: true,
    markdown: {
      breaks: true,
    },
  });

  const result = marp.render(markdown);
  const dom = new JSDOM(result.html);
  const { document } = dom.window;

  processImageElements(document, imageMap);
  normalizeMermaidDocument(document);

  const slideSections = getSlideSections(document);
  decorateSlideSections(slideSections, slideIdPrefix);

  const slides: ParsedSlide[] = slideSections.map((section, index) => {
    const svg = getSlideSvg(section);
    const id = section.getAttribute("id") ?? `${slideIdPrefix}-${index}`;

    return {
      html: section.outerHTML,
      sectionHtml: section.outerHTML,
      svgHtml: svg?.outerHTML ?? "",
      id,
      index,
      firstHeadingText: extractFirstHeadingText(section),
    };
  });

  return {
    slides,
    html: document.body.innerHTML,
    presentationHtml: buildPresentationHtml(slideSections),
    css: result.css,
  };
}
