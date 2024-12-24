import { type Component, For, Show } from "solid-js";

export const Pagination: Component<{
  baseUrl: string;
  lastPage: number;
  currentPage: number;
}> = (props) => {
  const currentPageStartingZero = props.currentPage - 1;
  const previousPage = currentPageStartingZero - (currentPageStartingZero % 5);
  const nextPage =
    Math.min(
      props.lastPage,
      currentPageStartingZero + (5 - (currentPageStartingZero % 5)),
    ) + 1;
  const pages = [...Array(nextPage - previousPage - 1).keys()].map(
    (v) => v + 1 + previousPage,
  );
  const selected = (page: number) =>
    props.currentPage == page ? "nav-link link-selected" : "nav-link";
  const disabled = (disabled: boolean) =>
    disabled ? "pointer-events-none cursor-default" : "";
  return (
    <div class="w-full flex gap-2 justify-center">
      <Show when={previousPage > 0}>
        <a
          href={
            previousPage == 1
              ? `${props.baseUrl}`
              : `${props.baseUrl}/${previousPage}`
          }
          class="px-1 nav-link font-mono"
        >
          &lt;
        </a>
      </Show>
      <For each={pages}>
        {(i) => (
          <a
            class={`px-1 font-mono ${selected(i)} ${disabled(i == props.currentPage)}`}
            href={i == 1 ? `${props.baseUrl}` : `${props.baseUrl}/${i}`}
          >
            {i}
          </a>
        )}
      </For>
      <Show when={nextPage <= props.lastPage}>
        <a
          href={`${props.baseUrl}/${nextPage}`}
          class="px-1 nav-link font-mono"
        >
          &gt;
        </a>
      </Show>
    </div>
  );
};
