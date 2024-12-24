import { type Component, Show } from "solid-js";

export const SubExperienceCard: Component<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  title: string;
  hasBorder?: boolean;
  subtitle?: string;
  from?: string;
  to?: string;
}> = (props) => {
  return (
    <article class={`${props.hasBorder ? "border-2 border-gray-800" : ""}`}>
      <div class="flex justify-between items-center flex-wrap">
        <div class="flex gap-2 items-baseline flex-wrap">
          <h3 class="text-lg">{props.title}</h3>
          <Show when={props.subtitle}>
            <p class="text-sm text-gray-800 dark:text-gray-200 mb-0">
              {props.subtitle}
            </p>
          </Show>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 font-mono mb-0">
          <Show when={props.from}>{`${props.from} - `}</Show>
          <Show when={props.to}>{`${props.to}`}</Show>
        </p>
      </div>
      <div>{props.children}</div>
    </article>
  );
};
