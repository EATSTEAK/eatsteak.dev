import type { JSX, Component } from "solid-js";
import { AnimatedLogo } from "./AnimatedLogo";

export const Intro: Component<{ recentPosts: Flatten<ContentEntryMap["blog"]>}> = () => {
  return (
    <main class="w-full flex flex-col items-stretch justify-start">
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
            <a
              class="py-2 px-4 transition-colors border-2
              before:bg-white bg-gradient-to-r hover-fill-to-right from-gray-800 to-gray-800 text-gray-800 hover:text-white border-gray-800
               dark:before:bg-gray-800 dark:from-white dark:to-white dark:text-white dark:hover:text-gray-800 dark:border-white"
              href="/about"
            >
              더 알아보기
            </a>
          </div>
        </div>
      </section>
      <section class="my-8 px-12 lg:mx-auto w-full max-w-[96rem]">
        <h2 class="uppercase">Recent Posts</h2>
        <div></div>
      </section>
      <section class="my-8 px-12 lg:mx-auto w-full max-w-[96rem]">
        <h2 class="uppercase">Projects</h2>
        <div></div>
      </section>
    </main>
  );
};
