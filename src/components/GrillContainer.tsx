import { type JSX, type Component, Show } from "solid-js";
import "./grill_container.css";

export const GrillContainer: Component<{
  absoluteBackground?: JSX.Element;
  children: JSX.Element;
  parentClassOverride?: string;
  grillClassOverride?: string;
  containerClassOverride?: string;
}> = (props) => {
  return (
    <section class={props.parentClassOverride ?? "relative h-72"}>
      <div class={`grill-background size-full ${props.grillClassOverride ?? "before:bg-slate-700 dark:before:bg-slate-400 before:bg-opacity-30 before:rotate-3"}`}>
        <div
          class={
            props.containerClassOverride ??
            "slide-to-top grill-content"
          }
        >
          {props.children}
        </div>
      </div>
      <Show when={props.absoluteBackground}>
        <div class="background-container">
          <div class="background-element">
            {props.absoluteBackground}
          </div>
        </div>
      </Show>
    </section>
  );
};
