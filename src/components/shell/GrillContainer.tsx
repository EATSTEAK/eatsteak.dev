import { type Component, type JSX, Show } from "solid-js";
import { cn } from "@/utils/cn.ts";

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
          "grill-background bg-linear-to-b from-slate-700/50 dark:from-slate-400/50 to-transparent -rotate-3",
          props.grillClass,
        )}
      />
      <div
        class={cn(
          "slide-to-top py-8 px-6 lg:mx-auto h-full w-full max-w-(--breakpoint-xl) flex flex-col items-start justify-end gap-2",
          props.containerClass,
        )}
      >
        {props.children}
      </div>

      <Show when={props.absoluteBackground}>
        <div class="absolute top-0 right-0 w-full h-full -z-20">
          <div class="mx-auto max-w-(--breakpoint-xl) w-full h-full flex justify-end overflow-hidden">
            {props.absoluteBackground}
          </div>
        </div>
      </Show>
    </section>
  );
};
