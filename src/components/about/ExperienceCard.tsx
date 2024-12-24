import { type Component, Show } from "solid-js";

export const ExperienceCard: Component<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  title: string;
  hasBorder?: boolean;
  subtitle?: string;
  from?: string;
  to?: string;
}> = (props) => {
  return (
    <article
      class={`${props.hasBorder ? "border-2 border-gray-800 p-4" : "p-4"}`}
    >
      <div class="flex justify-between items-center mb-4 flex-wrap">
        <div class="flex gap-2 items-baseline flex-wrap">
          <h2>{props.title}</h2>
          <Show when={props.subtitle}>
            <p class="text-xl text-gray-800 dark:text-gray-200 mb-0">
              {props.subtitle}
            </p>
          </Show>
        </div>

        <p class="text-gray-600 dark:text-gray-400 font-mono mb-0">
          <Show when={props.from}>{`${props.from} - `}</Show>
          <Show when={props.to}>{`${props.to}`}</Show>
        </p>
      </div>
      <div class="pl-4">{props.children}</div>
    </article>
  );
};
