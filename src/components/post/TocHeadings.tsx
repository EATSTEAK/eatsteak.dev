import { Transition } from "solid-transition-group";
import { type Component, For, Show } from "solid-js";
import type { TocHeading } from "../../types";

export const TocHeadings: Component<{
  tocHeadings: TocHeading[];
  activeHeadings: string[];
}> = (props) => {
  return (
    <ul>
      <For each={props.tocHeadings}>
        {(heading) => (
          <li class="leading-7 my-2 mx-1 [&>ul]:pl-6">
            <a
              class={`nav-link ${props.activeHeadings.includes(heading.slug) ? "link-selected" : ""}`}
              href={`#${heading.slug}`}
            >
              {heading.text}
            </a>
            <Transition name="slide-fade">
              <Show
                when={
                  props.activeHeadings.includes(heading.slug) &&
                  heading.subheadings.length > 0
                }
              >
                <TocHeadings
                  tocHeadings={heading.subheadings}
                  activeHeadings={props.activeHeadings}
                />
              </Show>
            </Transition>
          </li>
        )}
      </For>
    </ul>
  );
};
