import { type Component, For } from "solid-js";
export const Topics: Component<{ topics: string[] }> = (props) => {
  return (
    <div class="flex gap-2 flex-wrap">
      <For each={props.topics}>
        {(topic) => (
          <a
            href={`/topic/${topic}`}
            class="px-1 font-mono uppercase border-2 text-gray-800 hover:text-neutral-200 border-gray-800 dark:text-neutral-200 dark:hover:text-gray-800 dark:border-white dark:before:bg-gray-800 dark:from-white dark:to-white before:bg-neutral-100 bg-linear-to-r from-gray-800 to-gray-800 hover-fill-to-right spring-bounce-10 spring-duration-200"
          >
            {topic}
          </a>
        )}
      </For>
    </div>
  );
};
