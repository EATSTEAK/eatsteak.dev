import { createSignal, type Component, Show } from "solid-js";
import { Switch } from "./Switch";

export const LightSwitch: Component<{}> = () => {
  const [isDarkTheme, setDarkTheme] = createSignal(false);
  return (
    <div class="flex items-center justify-start">
      <Switch
        enabled={isDarkTheme()}
        onChange={(e) => {
          setDarkTheme(e.target.checked);
          console.log(e.target.checked);
        }}
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
