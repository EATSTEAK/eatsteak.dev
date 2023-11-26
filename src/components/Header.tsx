import "./header.css";

export const Header = (props) => {
  const selected = (page) =>
    props.page == page ? "nav-link link-selected" : "nav-link";
  return (
    <header class="flex justify-center content-center px-6 py-6">
      <div class="grow max-w-[96rem] flex gap-16 justify-start content-center">
        <h2 class="shrink-0 min-w-fit">
          <a href="/">
            <img src="/logo.png" class="w-[170px]"></img>
          </a>
        </h2>
        <nav class="grow flex justify-start items-center gap-8">
          <a class={selected("about")} href="/about">
            About
          </a>
          <a class={selected("posts")} href="/posts">
            Posts
          </a>
          <a class={selected("categories")} href="/categories">
            Categories
          </a>
        </nav>
        <aside class="shrink-0 flex justify-end items-center gap-2">
          <input type="checkbox"></input>
          <span class="align-center">LIGHT</span>
        </aside>
      </div>
    </header>
  );
};
