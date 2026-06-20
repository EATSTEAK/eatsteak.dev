import { JSDOM } from "jsdom";

const MERMAID_WRAPPER_CLASS = "mermaid-wrapper";
const MERMAID_CLASS = "mermaid";
const MERMAID_PENDING_ATTRIBUTE = "data-mermaid-pending";

function isMermaidPre(pre: HTMLPreElement): boolean {
  const code = Array.from(pre.children).find(
    (child) => child.tagName.toLowerCase() === "code",
  );
  const language = pre.getAttribute("data-language")?.toLowerCase();
  const classNames = `${pre.className} ${code?.className ?? ""}`
    .toLowerCase()
    .split(/\s+/);

  return language === "mermaid" || classNames.includes("language-mermaid");
}

function createMermaidElement(
  document: Document,
  source: string,
): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className = MERMAID_WRAPPER_CLASS;

  const pre = document.createElement("pre");
  pre.className = MERMAID_CLASS;
  pre.setAttribute(MERMAID_PENDING_ATTRIBUTE, "");
  pre.textContent = source;

  wrapper.append(pre);
  return wrapper;
}

export function normalizeMermaidHtml(html: string): string {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const mermaidBlocks = Array.from(document.querySelectorAll("pre")).filter(
    (pre): pre is HTMLPreElement => isMermaidPre(pre as HTMLPreElement),
  );

  for (const pre of mermaidBlocks) {
    const code = Array.from(pre.children).find(
      (child) => child.tagName.toLowerCase() === "code",
    );
    const source = code?.textContent ?? pre.textContent ?? "";
    pre.replaceWith(createMermaidElement(document, source));
  }

  return document.body.innerHTML;
}
