import { type Component, Show } from "solid-js";
import { CATEGORIES } from "@/consts.ts";
import { cn } from "@/utils/cn";

export const CategoryLabel: Component<{ class?: string; category: string }> = (
  props,
) => {
  const category =
    // eslint-disable-next-line solid/reactivity
    CATEGORIES?.[props.category] ?? CATEGORIES?.["uncategorized"];
  return (
    <Show
      when={category}
      fallback={
        <label
          class={cn(
            "uppercase font-bold tracking-widest transition-all hover:brightness-125 focus:brightness-125 px-1 spring-bounce-10 spring-duration-200",
            props.class,
          )}
        >
          Uncategorized
        </label>
      }
    >
      <a
        class={cn(
          "uppercase font-bold tracking-widest transition-all hover:brightness-125 focus:brightness-125 px-1 spring-bounce-10 spring-duration-200",
          props.class,
        )}
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
