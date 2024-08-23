import type { Component } from "solid-js";
import { AnimatedLogo } from "../ui/AnimatedLogo.tsx";
import { Button } from "../ui/Button.tsx";
import { GrillContainer } from "../shell/GrillContainer.tsx";
import "./intro.css";

export const Intro: Component<{}> = () => {
  return (
    <GrillContainer
      absoluteBackground={<AnimatedLogo class="-mt-16 w-[32rem] h-[32rem]" />}
    >
      <p class="box-text">Grilling</p>
      <p class="box-text">Burning-Hot Applications</p>
      <Button href="/about">프로필 보기</Button>
    </GrillContainer>
  );
};
