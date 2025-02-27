import type { Component } from "solid-js";
import "./container.css";
import { cn } from "@utils/cn.ts";

export const Container: Component<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}> = (props) => {
  return (
    <section class={cn("w-full max-w-screen-xl mx-auto px-6 my-8")}>
      {props.children}
    </section>
  );
};
