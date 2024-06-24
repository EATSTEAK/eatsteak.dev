import { type Component, For } from "solid-js";
import "./topics.css";
export const Topics: Component<{ topics: string[] }> = (props) => {
  return (
    <div class="flex gap-2 flex-wrap">
      <For each={props.topics}>
        {(topic) => (
          <a
            href={`/topic/${topic}`}
            class="topic-btn transition-colors"
          >
            {topic}
          </a>
        )}
      </For>
    </div>
  );
};
