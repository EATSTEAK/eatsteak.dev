import { type Component, createEffect, createSignal } from "solid-js";
import theme from "@signals/theme.ts";

export const Comments: Component = () => {
  const [isDarkTheme] = theme;
  const [sectionRef, setSectionRef] = createSignal<HTMLDivElement | null>(null);
  const utterances = () => {
    const utterancesScript = document.createElement("script");
    utterancesScript.src = "https://utteranc.es/client.js";
    utterancesScript.setAttribute("repo", "eatsteak/eatsteak.dev");
    utterancesScript.setAttribute("issue-term", "pathname");
    utterancesScript.setAttribute("label", "blog");
    utterancesScript.setAttribute(
      "theme",
      isDarkTheme() ? "dark-blue" : "github-light",
    );
    utterancesScript.crossOrigin = "anonymous";
    utterancesScript.async = true;
    return utterancesScript;
  };
  createEffect(() => {
    const ref = sectionRef();
    if (ref) {
      ref.innerHTML = "";
      ref.appendChild(utterances());
    }
  });
  return <section class="comments" ref={setSectionRef} />;
};
