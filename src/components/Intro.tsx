import type { JSX, Component } from "solid-js";
import { AnimatedLogo } from "./AnimatedLogo";
import { Button } from "./Button";

export const Intro: Component<{}> = () => {
  return (
    <section class="relative h-72">
      <div class="absolute top-0 right-0 w-full h-full">
        <div class="mx-auto max-w-[96rem] w-full h-full flex justify-end overflow-hidden">
          <AnimatedLogo class="-mt-16 w-[32rem] h-[32rem]" />
        </div>
      </div>
      <div class="grill-background before:bg-slate-700 dark:before:bg-slate-400 before:bg-opacity-30 before:rotate-3 w-full h-full">
        <div class="slide-to-top py-8 px-12 lg:mx-auto h-full w-full max-w-[96rem] flex flex-col items-start justify-end gap-2">
          <p
            class="py-2 px-2 m-0 font-head font-bold text-5xl bg-gray-800 text-white
            dark:bg-white dark:text-gray-800"
          >
            Grilling
          </p>
          <p
            class="py-2 px-2 m-0 font-head font-bold text-5xl bg-gray-800 text-white
            dark:bg-white dark:text-gray-800"
          >
            Burning-Hot Applications
          </p>
          <Button href="/about"
          >
            프로필 보기
          </Button>
        </div>
      </div>
    </section>
  );
};
