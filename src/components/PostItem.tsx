import type { CollectionEntry } from "astro:content";
import { type JSX, type Component, Show } from "solid-js";
import { FormattedDate } from "./FormattedDate";
import { Topics } from "./Topics";

export const PostItem: Component<{ post: CollectionEntry<"blog"> }> = (
  props
) => {
  return (
    <article>
      <a href={`/posts/${props.post.slug}`}>
        <Show when={props.post.data.heroImage}>
          <div
            class="mb-4"
            style={{
              "background-size": "cover",
              "background-position": "center",
              "background-image": `url(${props.post.data.heroImage})`,
              width: "100%",
              height: "16rem",
            }}
          ></div>
        </Show>
        <legend class="uppercase font-bold tracking-widest mb-2">
          {props.post.data.category ?? "Uncategorized"}
        </legend>
        <h4>
          <span class="nav-link">{props.post.data.title}</span>
        </h4>
        <div class="date mb-4 text-gray-500">
          <FormattedDate dateTime={props.post.data.pubDate} />
          {props.post.data.updatedDate && (
            <div class="last-updated-on">
              |
              <FormattedDate dateTime={props.post.data.updatedDate} /> 수정
            </div>
          )}
        </div>
        <div class="text-gray-700 dark:text-gray-300 mb-4">
          {props.post.data.description}
        </div>
      </a>
      {props.post.data.topics && <Topics topics={props.post.data.topics} />}
    </article>
  );
};
