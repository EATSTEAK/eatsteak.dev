import type { JSX, Component } from "solid-js";
import "./animated_logo.css";
export const AnimatedLogo: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return <div {...props} class={`animated-logo ${props.class ?? ''}`}></div>;
};
