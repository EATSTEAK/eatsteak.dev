import type { CollectionEntry } from "astro:content";
import { type JSX, type Component, Show } from "solid-js";
import { FormattedDate } from "./FormattedDate";
import { Topics } from "./Topics";

export const PostItem: Component<{ post: CollectionEntry<"blog"> }> = (
  props
) => {
  return (
    <article>
      <Show when={props.post.data.heroImage}>
        <div
          class="pb-4"
          style={{
            "background-size": "cover",
            "background-position": "center",
            "background-image": `url(${props.post.data.heroImage})`,
            width: "16rem",
            height: "9rem",
          }}
        ></div>
      </Show>
      <a href={`/posts/${props.post.slug}`}>
        <h4>
          <span class="nav-link">{props.post.data.title}</span>
        </h4>
        <div class="date pb-2 text-gray-500">
          <FormattedDate dateTime={props.post.data.pubDate} />
          {props.post.data.updatedDate && (
            <div class="last-updated-on">
              |
              <FormattedDate dateTime={props.post.data.updatedDate} /> 수정
            </div>
          )}
        </div>
      </a>
      {props.post.data.topics && <Topics topics={props.post.data.topics} />}
    </article>
  );
};
