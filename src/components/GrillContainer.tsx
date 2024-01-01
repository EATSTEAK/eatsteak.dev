import { type JSX, type Component, Show } from "solid-js";

export const GrillContainer: Component<{
  absoluteBackground?: JSX.Element;
  children: JSX.Element;
  parentClassOverride?: string;
  containerClassOverride?: string;
}> = (props) => {
  return (
    <section class={props.parentClassOverride ?? "relative h-72"}>
      <Show when={props.absoluteBackground}>
        <div class="absolute top-0 right-0 w-full h-full">
          <div class="mx-auto max-w-[96rem] w-full h-full flex justify-end overflow-hidden">
            {props.absoluteBackground}
          </div>
        </div>
      </Show>
      <div class="grill-background before:bg-slate-700 dark:before:bg-slate-400 before:bg-opacity-30 before:rotate-3 w-full h-full">
        <div
          class={
            props.containerClassOverride ??
            "slide-to-top py-8 px-6 lg:mx-auto h-full w-full max-w-[96rem] flex flex-col items-start justify-end gap-2"
          }
        >
          {props.children}
        </div>
      </div>
    </section>
  );
};
