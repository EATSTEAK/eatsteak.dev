import type { JSX, Component } from "solid-js";
import { createSignal, splitProps } from "solid-js";
import "./switch.css";

interface SwitchProps {
  enabled: boolean;
  ref?: HTMLInputElement;
  onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>;
  children?: JSX.Element;
}

export const Switch: Component<
  SwitchProps & JSX.InputHTMLAttributes<HTMLInputElement>
> = (props) => {
  const [isEnabled, setIsEnabled] = createSignal(props.enabled);

  const [self, inputAttributes] = splitProps(props, [
    "enabled",
    "ref",
    "onChange",
    "children",
  ]);

  const toggle = () => {
    setIsEnabled((c) => !c);
    const event = new Event("change");
    props.ref?.dispatchEvent(event);
  };

  const handleClick = () => {
    toggle();
  };
  return (
    <>
      <div
        onClick={handleClick}
        class="switch-background transition-colors bg-white border-black dark:bg-slate-700 dark:border-white"
      >
        <div
          class={`switch-display transition-colors bg-white border-black dark:bg-slate-700 dark:border-white${
            isEnabled() ? " enabled" : ""
          }`}
        >
          {self.children}
        </div>
        <input
          ref={props.ref}
          type="checkbox"
          class="invisible"
          checked={isEnabled()}
          onChange={(e) => self?.onChange?.(e)}
          {...inputAttributes}
        ></input>
      </div>
    </>
  );
};
