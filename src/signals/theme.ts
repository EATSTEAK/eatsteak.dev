import { createSignal } from "solid-js";

const initializeTheme = () => {
  let theme;
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    theme = (localStorage.getItem("theme") as "light" | "dark") === "dark";
  } else {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return theme;
};

export default createSignal(initializeTheme());
