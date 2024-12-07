import { type Component, type JSX, Show } from "solid-js";
import "./grill_container.css";
import { cn } from "@utils/cn.ts";

export const GrillContainer: Component<{
  absoluteBackground?: JSX.Element;
  children: JSX.Element;
  parentClass?: string;
  grillClass?: string;
  containerClass?: string;
}> = (props) => {
  return (
    <section class={cn("relative overflow-hidden min-h-72", props.parentClass)}>
      <div
        class={cn(
          "grill-background bg-slate-700 dark:bg-slate-400 bg-opacity-30 rotate-3",
          props.grillClass,
        )}
      ></div>
      <div class={cn("slide-to-top grill-content", props.containerClass)}>
        {props.children}
      </div>

      <Show when={props.absoluteBackground}>
        <div class="background-container">
          <div class="background-element">{props.absoluteBackground}</div>
        </div>
      </Show>
    </section>
  );
};
