import { TocHeading } from "./TocHeading";
import { type JSX, type Component, createSignal } from "solid-js";

export const TableOfContents: Component<{ tocHeadings: TocHeading[] }> = (props) => {
    const [activeSections, setActiveSections] = createSignal<string[]>([]);
    const observer = new IntersectionObserver((sections) => {
        let currentActiveSections = [...activeSections()];
        let hasUpdate = false;
        sections.forEach((section) => {

            const heading = section.target.querySelector("h2, h3, h4, h5");
            if (!heading) return;
            const id = heading.getAttribute("id");
            if (id == null) return;
            if (section.intersectionRatio > 0) {
                if(!currentActiveSections.includes(id)) {
                    currentActiveSections.push(id);
                    hasUpdate = true;
                }
            } else {
                let index = currentActiveSections.indexOf(id);
                if (index > -1) {
                    currentActiveSections.splice(index, 1);
                    hasUpdate = true;
                }
            }
        })
        if (hasUpdate) {
            console.log(currentActiveSections);
            setActiveSections(currentActiveSections);
        }
    });

    document.querySelectorAll(".prose section").forEach((section) => {
        observer.observe(section);
    })
    return (
        <nav class="w-80">
            <p class="text-center font-head font-semibold">CONTENTS</p>
            <TocHeading tocHeadings={props.tocHeadings} activeHeadings={activeSections()} />
        </nav>
    );
};
