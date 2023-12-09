import { type JSX, type Component, For } from "solid-js";

export const Topics: Component<{ topics: string[] }> = (props) => {
  return (
    <div class="flex gap-2 flex-wrap">
      <For each={props.topics}>
        {(topic, i) => (
          <div class="font-mono uppercase cursor-pointer transition-colors border-gray-700 dark:border-white border px-1">
            {topic}
          </div>
        )}
      </For>
    </div>
  );
};
