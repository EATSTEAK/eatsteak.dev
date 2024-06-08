import { type JSX, type Component, For } from "solid-js";

export const Topics: Component<{ topics: string[] }> = (props) => {
  return (
    <div class="flex gap-2 flex-wrap">
      <For each={props.topics}>
        {(topic) => (
          <a
            href={`/topic/${topic}`}
            class="px-1 font-mono uppercase transition-colors border-2
  before:bg-white bg-gradient-to-r hover-fill-to-right from-gray-800 to-gray-800 text-gray-800 hover:text-white border-gray-800
   dark:before:bg-gray-800 dark:from-white dark:to-white dark:text-white dark:hover:text-gray-800 dark:border-white"
          >
            {topic}
          </a>
        )}
      </For>
    </div>
  );
};
