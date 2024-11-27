import type { JSX, Component } from "solid-js";
import { Profile } from "@icons/Profile";
export const AnimatedLogo: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} class={`${props.class ?? ""}`} role="presentation">
      <Profile />
    </div>
  );
};
