import { ReactiveSet } from "@solid-primitives/set";
import { type Component, createSignal, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { TocHeadings } from "@/components/TocHeadings";
import type { TocHeading } from "@/types";

export const TableOfContents: Component<{
  watchSection?: boolean;
  tocHeadings: TocHeading[];
}> = (props) => {
  const [isVisible, setVisibility] = createSignal(true);
  const activeSections = new ReactiveSet<string>([]);
  const observer = new IntersectionObserver((sections) =>
    sections.forEach((section) => {
      const heading = section.target.querySelector("h2, h3, h4, h5");
      if (!heading) return;
      const id = props.watchSection
        ? section.target.getAttribute("id")
        : heading.getAttribute("id");
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
        class="cursor-pointer flex justify-between w-full font-semibold font-head py-1 px-2 uppercase border-2 text-gray-800 hover:text-neutral-200 border-gray-800 dark:text-neutral-200 dark:hover:text-gray-800 dark:border-white dark:before:bg-gray-800 dark:from-white dark:to-white before:bg-neutral-100 bg-linear-to-r from-gray-800 to-gray-800 hover-fill-to-right"
        onClick={() => setVisibility(!isVisible())}
      >
        <span>CONTENTS</span>
        <svg
          class={`transition-transform mt-0.5 ${isVisible() ? "rotate-180" : ""}`}
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
