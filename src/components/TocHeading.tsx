import "./toc_heading.css";
import { type JSX, type Component, For, Show } from "solid-js";

export const TocHeading: Component<{ tocHeading: TocHeading }> = (props) => {
    return (
        <li>
            <a class="nav-link" href={`#${props.tocHeading.slug}`}>
                {props.tocHeading.text}
            </a>
            <Show when={props.tocHeading.subheadings.length > 0}>
                <ul>
                    <For each={props.tocHeading.subheadings}>
                        {(subHeading => <TocHeading tocHeading={subHeading} />)}
                    </For>
                </ul>
            </Show>
        </li>
    );
};
