import { createSignal } from "solid-js";

const initializeTheme = () => {
  let theme;
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    theme = (localStorage.getItem("theme") as "light" | "dark") === "dark";
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = true;
  } else {
    theme = false;
  }
  return theme;
};

export default createSignal(initializeTheme());
