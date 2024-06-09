import "./toc_heading.css";
import { type JSX, type Component, For, Show } from "solid-js";

export const TocHeading: Component<{ tocHeadings: TocHeading[] }> = (props) => {
    return (
        <ul>
            <For each={props.tocHeadings}>
                {(heading) => <li>
                    <a class="nav-link" href={`#${heading.slug}`}>
                        {heading.text}
                    </a>
                    <Show when={heading.subheadings.length > 0}>
                        <TocHeading tocHeadings={heading.subheadings} />
                    </Show>
                </li>}
            </For>
        </ul>
    );
};
