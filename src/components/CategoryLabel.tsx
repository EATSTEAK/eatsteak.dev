import { type Component, Show } from "solid-js";
import { CATEGORIES } from "../consts";

import "./category_label.css";

export const CategoryLabel: Component<{ category: string }> = (props) => {
  const category =
    CATEGORIES?.[props.category] ?? CATEGORIES?.["uncategorized"];
  return (
    <Show
      when={category}
      fallback={<label class="category-label">Uncategorized</label>}
    >
      <a
        class={`category-label bg-category-${category.id}-bg dark:bg-category-${category.id}-bg-dark text-category-${category.id}-text dark:text-category-${category.id}-text-dark`}
        href={`/category/${category.id}`}
      >
        {category.name}
      </a>
    </Show>
  );
};
