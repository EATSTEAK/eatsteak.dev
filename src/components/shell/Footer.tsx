import type { Component } from "solid-js";
import "./footer.css";

export const Footer: Component = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <span class="font-mono">
        Copyright 2023-{currentYear} <a href="https://eatsteak.dev">EATSTEAK</a>
        . All rights reserved.
      </span>
    </footer>
  );
};
