import type { JSX, Component } from "solid-js";

export const Footer: Component<{}> = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer class="w-full flex justify-center py-12">
      <span>Copyright 2023-{currentYear} <a href="https://eatsteak.dev">EATSTEAK</a>. All rights
        reserved.</span>
    </footer>
  );
};
