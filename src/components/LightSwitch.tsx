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
      <label for="lightswitch" class="align-center font-mono hidden lg:inline">
        <Show when={isDarkTheme()} fallback="LIGHT">
          DARK
        </Show>
      </label>
      <Switch
        id="lightswitch"
        enabled={isDarkTheme()}
        onChange={(e) => setDarkTheme(e.target.checked)}
      >
        <div class="w-full h-full flex justify-center items-center">
          <Show
            when={isDarkTheme()}
            fallback={<img src="/images/sun.svg"></img>}
          >
            <img
              src="/images/moon.svg"
              class="dark:invert transition-[filter]"
            ></img>
          </Show>
        </div>
      </Switch>
    </div>
  );
};
