import type { Component } from "solid-js";
import "./container.css";

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
    <section class={`container ${getVarientClass(props.varient ?? "normal")}`}>
      {props.children}
    </section>
  );
};
