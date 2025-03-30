import type { Component, JSX } from "solid-js";
import { createSignal } from "solid-js";
import "./switch.css";

interface SwitchProps {
  enabled: boolean;
  ref?: HTMLInputElement;
  onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event>;
  children?: JSX.Element;
  id?: string;
  name?: string;
  value?: string;
}

export const Switch: Component<SwitchProps> = (props) => {
  const [isEnabled, setIsEnabled] = createSignal(props.enabled);

  const toggle = () => {
    setIsEnabled((c) => !c);
    const event = new Event("change");
    props.ref?.dispatchEvent(event);
  };

  const handleClick = () => {
    toggle();
  };

  const handleKeyUp = (
    e: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element },
  ) => {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };
  return (
    <>
      <div
        onClick={handleClick}
        class="mx-6 w-10 h-4 border-2 cursor-pointer transition-colors bg-neutral-100al-50 border-black dark:bg-slate-700 dark:border-white"
        tabindex="0"
        onKeyUp={handleKeyUp}
      >
        <div
          class={`text-xl text-center leading-8 block w-8 h-8 border-2 switch-transform transition-colors bg-neutral-100 border-black dark:bg-slate-700 dark:border-white${
            isEnabled() ? " enabled" : ""
          }`}
        >
          {props.children}
        </div>
        <input
          ref={props.ref}
          type="checkbox"
          class="invisible"
          checked={isEnabled()}
          onChange={(e) => props.onChange?.(e)}
          id={props.id}
          name={props.name}
          value={props.value}
        />
      </div>
    </>
  );
};
