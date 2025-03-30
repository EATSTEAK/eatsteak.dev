import type { Component } from "solid-js";
import { cn } from "@/utils/cn.ts";

export const Container: Component<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}> = (props) => {
  return (
    <section
      class={cn(
        "max-w-screen-xl px-6 my-8 flex flex-col gap-4 lg:mx-auto w-full",
      )}
    >
      {props.children}
    </section>
  );
};
