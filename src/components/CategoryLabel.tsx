import { type JSX, type Component, Show } from "solid-js";
import { CATEGORIES } from "../consts";

export const CategoryLabel: Component<{ category: string }> = (props) => {
  const category = CATEGORIES?.[props.category] ?? CATEGORIES?.["uncategorized"];
  return (
    <Show
      when={category}
      fallback={
        <legend class="uppercase font-bold tracking-widest mb-2">
          Uncategorized
        </legend>
      }
    >
      <a
        class="uppercase font-bold tracking-widest mb-2"
        href={`/category/${category.id}`}
      >
        <span
          class={`px-1 bg-category-${category.id}-bg dark:bg-category-${category.id}-bg-dark text-category-${category.id}-text dark:text-category-${category.id}-text-dark`}
        >
          {category.name}
        </span>
      </a>
    </Show>
  );
};
