import type { JSX, Component } from "solid-js";
import { Profile } from "@/icons/Profile";
import { cn } from "@/utils/cn";
export const AnimatedLogo: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  return (
    <div {...props} class={cn(props.class)} role="presentation">
      <Profile />
    </div>
  );
};
