import type { JSX, Component } from "solid-js";
import { AnimatedLogo } from "./AnimatedLogo";
import { Button } from "./Button";
import { GrillContainer } from "./GrillContainer";

export const Intro: Component<{}> = () => {
  return (
    <GrillContainer absoluteBackground={<AnimatedLogo class="-mt-16 w-[32rem] h-[32rem]" />}>
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
    </GrillContainer>
  );
};
