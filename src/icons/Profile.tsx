import type { Component, JSX } from "solid-js";

export const Profile: Component<JSX.SvgSVGAttributes<SVGSVGElement>> = (
  props
) => {
  return (
    <svg
      id="profile"
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stop-color="#ca5010">
            <animate
              attributeName="offset"
              values="0%;50%;0%"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="25%" stop-color="#d13438">
            <animate
              attributeName="offset"
              values="25%;75%;25%"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="75%" stop-color="#ff8c00">
            <animate
              attributeName="offset"
              values="75%;125%;75%"
              dur="4s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stop-color="#ca5010">
            <animate
              attributeName="offset"
              values="100%;150%;100%"
              dur="4s"
              repeatCount="indefinite"
            />{" "}
          </stop>
        </linearGradient>
        <mask id="mask">
          <rect
            x="64.5289"
            y="428.173"
            width="490.415"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 64.5289 428.173)"
          />
          <rect
            x="185.66"
            y="254.063"
            width="272.453"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 185.66 254.063)"
          />
          <rect
            x="197.7"
            y="189.043"
            width="163.472"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 197.7 189.043)"
          />
          <rect
            x="303.66"
            y="295.002"
            width="163.472"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 303.66 295.002)"
          />
          <rect
            x="238.639"
            y="307.043"
            width="272.453"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 238.639 307.043)"
          />
          <rect
            x="110.284"
            y="435.398"
            width="54.4905"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 110.284 435.398)"
          />
          <rect
            x="57.3044"
            y="382.418"
            width="54.4905"
            height="27.2453"
            rx="13.6226"
            transform="rotate(-45 57.3044 382.418)"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="512"
        height="512"
        fill="url(#bg)"
        mask="url(#mask)"
      />
    </svg>
  );
};
