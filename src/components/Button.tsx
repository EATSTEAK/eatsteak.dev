import { type JSX, type Component, splitProps } from "solid-js";
import "./button.css";
export const Button: Component<
  { children?: JSX.Element } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  const [self, anchorAttributes] = splitProps(props, ["children"]);

  return (
    <a
      {...anchorAttributes}
      class="hover-fill-to-right button"
    >
      {self.children}
    </a>
  );
};
