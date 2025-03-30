import { type JSX, type Component, splitProps } from "solid-js";
import "./button.css";
export const Button: Component<
  { children?: JSX.Element } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  const [self, anchorAttributes] = splitProps(props, ["children", "class"]);

  return (
    <a
      {...anchorAttributes}
      class={`button-hover-effect font-mono py-2 px-4 transition-colors border-2 before:bg-white bg-linear-to-r from-gray-800 to-gray-800 text-gray-800 hover:text-white border-gray-800 dark:before:bg-gray-800 dark:from-white dark:to-white dark:text-white dark:hover:text-gray-800 dark:border-white ${props.class ?? ""}`}
    >
      {self.children}
    </a>
  );
};
