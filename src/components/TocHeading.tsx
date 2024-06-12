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
                    <Show when={heading.subheadings.length > 0}>
                        <TocHeading tocHeadings={heading.subheadings} activeHeadings={props.activeHeadings} />
                    </Show>
                </li>}
            </For>
        </ul>
    );
};
