import type { JSX, Component } from "solid-js";

type ContainerVarient = "normal" | "wide";

export const Container: Component<{ children: any, varient?: ContainerVarient }> = (props) => {

  const getVarientClass = (varient: ContainerVarient) => {
    switch(varient) {
      case "normal":
        return "max-w-5xl"
      default:
        return "max-w-screen-xl"
    }
  }
  return (
    <section class={`px-6 my-8 flex flex-col gap-4 lg:mx-auto w-full ${getVarientClass(props.varient ?? "normal")}`}>
      {props.children}
    </section>
  );
};
