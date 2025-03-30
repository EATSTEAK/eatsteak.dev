import { type Component, Show } from "solid-js";
import { CATEGORIES } from "@/consts.ts";

export const CategoryLabel: Component<{ category: string }> = (props) => {
  const category =
    // eslint-disable-next-line solid/reactivity
    CATEGORIES?.[props.category] ?? CATEGORIES?.["uncategorized"];
  return (
    <Show
      when={category}
      fallback={
        <label class="uppercase font-bold tracking-widest mb-2 transition-all hover:brightness-125 focus:brightness-125 px-1">
          Uncategorized
        </label>
      }
    >
      <a
        class="uppercase font-bold tracking-widest mb-2 transition-all hover:brightness-125 focus:brightness-125 px-1"
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
