import { GitHub } from "@icons/GitHub.tsx";
import { Threads } from "@icons/Threads.tsx";

export const Profile = () => {
  return (
    <section>
      <div class="flex gap-2 items-center mb-2">
        <div class="bg-gray-200 rounded-full w-16 h-16">
          <img
            alt="Profile image of EATSTEAK"
            src="/images/profile.png"
            class="w-16"
          />
        </div>
        <div class="grow">
          <h1 class="text-xl m-0">EATSTEAK</h1>
          <p class="m-0">전 취미로 코딩해요</p>
        </div>
      </div>
      <div>
        <h2 class="text-xl">FOLLOW ME AT</h2>
        <div class="flex gap-4 items-center">
          <a
            href="https://github.com/eatsteak"
            aria-label="@EATSTEAK at GitHub"
          >
            <GitHub class="w-8 hover:text-gray-900 text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors" />
          </a>
          <a
            href="https://threads.net/eatsteak.dev"
            aria-label="@eatsteak.dev at Threads"
          >
            <Threads class="w-8 hover:text-gray-900 text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};
