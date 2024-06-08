import { LightSwitch } from "./LightSwitch";

export const Header = (props: { page: string }) => {
  const selected = (page: string) =>
    props.page.startsWith(page) ? "nav-link link-selected" : "nav-link";
  return (
    <header class="flex justify-center content-center px-6 py-6">
      <div class="grow max-w-screen-xl flex flex-wrap gap-4 lg:gap-16 justify-between lg:justify-start content-center">
        <h2 class="shrink-0 min-w-fit order-1">
          <a href="/">
            <img
              src="/images/logo.png"
              class="w-[120px] md:w-[160px] dark:invert transition-[filter]"
            ></img>
          </a>
        </h2>
        <nav class="grow flex justify-center lg:justify-start items-center gap-8 order-3 lg:order-2 basis-full lg:basis-1">
          <a class={selected("about")} href="/about">
            About
          </a>
          <a class={selected("post")} href="/posts">
            Posts
          </a>
          <a class={selected("category")} href="/category">
            Categories
          </a>
        </nav>
        <aside class="shrink-0 flex justify-end items-center gap-2 order-2 lg:order-3">
          <LightSwitch />
        </aside>
      </div>
    </header>
  );
};
