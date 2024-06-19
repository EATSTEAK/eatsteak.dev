import { LightSwitch } from "./LightSwitch";
import "./header.css";
export const Header = (props: { page: string }) => {
  const selected = (page: string) =>
    props.page.startsWith(page) ? "nav-link link-selected" : "nav-link";
  return (
    <header>
      <div class="navbar-container">
        <h2 class="logo-container">
          <a href="/" aria-label="Go to the main page">
            <img
              src="/images/logo.png"
              alt="eatsteak.dev"
              class="logo-image"
            ></img>
          </a>
        </h2>
        <nav class="navbar">
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
        <aside class="switch-container">
          <LightSwitch />
        </aside>
      </div>
    </header>
  );
};
