import { type Component, createEffect, Show } from "solid-js";
import { Switch } from "../ui/Switch.tsx";
import theme from "../../signals/theme.ts";

export const LightSwitch: Component<{}> = () => {
  const [isDarkTheme, setDarkTheme] = theme;
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
            fallback={<img alt="Light mode" src="/images/sun.svg"></img>}
          >
            <img
              alt="Dark mode"
              src="/images/moon.svg"
              class="dark:invert transition-[filter]"
            ></img>
          </Show>
        </div>
      </Switch>
    </div>
  );
};
