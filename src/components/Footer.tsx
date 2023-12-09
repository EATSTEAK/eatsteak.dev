import type { JSX, Component } from "solid-js";

export const Footer: Component<{}> = () => {
  return (
    <footer class="w-full flex justify-center py-12">
      <span>Copyright 2023 <a href="https://eatsteak.dev">EATSTEAK</a> All rights
      reserved.</span>
    </footer>
  );
};
