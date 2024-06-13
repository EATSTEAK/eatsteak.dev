import { Transition } from "solid-transition-group";
import "./toc_heading.css";
import { type JSX, type Component, For, Show, createSignal } from "solid-js";

export const TocHeading: Component<{ tocHeadings: TocHeading[], activeHeadings: string[] }> = (props) => {


    return (
        <ul>
            <For each={props.tocHeadings}>
                {(heading) => <li>
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
