import { createSignal, type Component, Show, createEffect } from "solid-js";
import { Switch } from "./Switch";

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

export const LightSwitch: Component<{}> = () => {
  const [isDarkTheme, setDarkTheme] = createSignal(initializeTheme());
  createEffect(() => {
    if (isDarkTheme()) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
  return (
    <div class="flex items-center justify-start">
      <Switch
        enabled={isDarkTheme()}
        onChange={(e) => setDarkTheme(e.target.checked)}
      >
        <Show when={isDarkTheme()} fallback="L">
          D
        </Show>
      </Switch>
      <span class="align-center font-mono w-16">
        <Show when={isDarkTheme()} fallback="LIGHT">
          DARK
        </Show>
      </span>
    </div>
  );
};
