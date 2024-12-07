import { type Component, Show } from "solid-js";
import { CATEGORIES } from "@consts";

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
        class={`category-label`}
        style={{
          "background-color": `var(--category-${category.id}-bg)`,
          color: `var(--category-${category.id}-text)`,
        }}
        href={`/category/${category.id}`}
        aria-label={category.name}
      >
        {category.name}
      </a>
    </Show>
  );
};
