import { Transition } from "solid-transition-group";
import "./toc.css";
import { type Component, For, Show } from "solid-js";

export const TocHeading: Component<{ tocHeadings: TocHeading[], activeHeadings: string[] }> = (props) => {

    return (
        <ul>
            <For each={props.tocHeadings}>
                {(heading) => <li class="toc">
                    <a class={`nav-link ${props.activeHeadings.includes(heading.slug) ? "link-selected" : ""}`} href={`#${heading.slug}`}>
                        {heading.text}
                    </a>
                    <Transition name="slide-fade">
                        <Show when={props.activeHeadings.includes(heading.slug) && heading.subheadings.length > 0}>
                            <TocHeading tocHeadings={heading.subheadings} activeHeadings={props.activeHeadings} />
                        </Show>
                    </Transition>

                </li>}
            </For>
        </ul>
    );
};
