import { type Component, createEffect } from "solid-js";
import theme from "../../signals/theme.ts";

export const Comments: Component<{}> = () => {
  const [isDarkTheme, _] = theme;
  let sectionRef: HTMLDivElement;
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
    if (sectionRef) {
      sectionRef.innerHTML = "";
      sectionRef.appendChild(utterances());
    }
  }, [isDarkTheme]);
  // @ts-ignore
  return <section class="comments" ref={sectionRef}></section>;
};
