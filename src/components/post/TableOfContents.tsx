import { ReactiveSet } from "@solid-primitives/set";
import { type Component, createSignal, Show } from "solid-js";
import "./toc.css";
import { Transition } from "solid-transition-group";
import { TocHeadings } from "@components/post/TocHeadings.tsx";
import type { TocHeading } from "../../types";

export const TableOfContents: Component<{ tocHeadings: TocHeading[] }> = (
  props,
) => {
  const [isVisible, setVisibility] = createSignal(true);
  const activeSections = new ReactiveSet<string>([]);
  const observer = new IntersectionObserver((sections) =>
    sections.forEach((section) => {
      const heading = section.target.querySelector("h2, h3, h4, h5");
      if (!heading) return;
      const id = heading.getAttribute("id");
      if (id == null) return;
      if (section.intersectionRatio > 0) {
        if (!activeSections.has(id)) activeSections.add(id);
      } else {
        if (activeSections.has(id)) activeSections.delete(id);
      }
    }),
  );

  document.querySelectorAll(".prose section").forEach((section) => {
    observer.observe(section);
  });
  return (
    <nav class="w-80 max-h-screen">
      <button
        class="contents-btn hover-fill-to-right transition-colors"
        onClick={() => setVisibility(!isVisible())}
      >
        <span>CONTENTS</span>
        <svg
          class={`transition-transform mt-0.5 ${isVisible() ? "toc-active" : ""}`}
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z" />
        </svg>
      </button>
      <Transition name="slide-fade">
        <Show when={isVisible()}>
          <div class="overflow-y-auto max-h-[80vh]">
            <TocHeadings
              tocHeadings={props.tocHeadings}
              activeHeadings={[...activeSections]}
            />
          </div>
        </Show>
      </Transition>
    </nav>
  );
};
