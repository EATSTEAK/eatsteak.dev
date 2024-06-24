import { ReactiveSet } from "@solid-primitives/set";
import { TocHeading } from "./TocHeading";
import { type JSX, type Component, createSignal } from "solid-js";

export const TableOfContents: Component<{ tocHeadings: TocHeading[] }> = (props) => {
    const activeSections = new ReactiveSet<string>([]);
    const observer = new IntersectionObserver((sections) => sections.forEach((section) => {

        const heading = section.target.querySelector("h2, h3, h4, h5");
        if (!heading) return;
        const id = heading.getAttribute("id");
        if (id == null) return;
        if (section.intersectionRatio > 0) {
            if (!activeSections.has(id)) activeSections.add(id);
        } else {
            if (activeSections.has(id)) activeSections.delete(id);
        }
    }));

    document.querySelectorAll(".prose section").forEach((section) => {
        observer.observe(section);
    })
    return (
        <nav class="w-80">
            <p class="text-center font-head font-semibold">CONTENTS</p>
            <TocHeading tocHeadings={props.tocHeadings} activeHeadings={[...activeSections]} />
        </nav>
    );
};
