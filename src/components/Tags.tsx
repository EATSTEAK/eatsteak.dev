import { type JSX, type Component, For } from "solid-js";

export const Tags: Component<{ tags: string[] }> = (props) => {
  return (
    <div class="flex gap-2 flex-wrap">
      <For each={props.tags}>
        {(tag, i) => (
          <div class="font-mono uppercase cursor-pointer transition-colors border-gray-700 dark:border-white border px-1">
            {tag}
          </div>
        )}
      </For>
    </div>
  );
};
