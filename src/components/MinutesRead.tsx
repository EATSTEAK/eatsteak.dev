import type { Component } from "solid-js";

export const MinutesRead: Component<{ minutesRead: number }> = (props) => {
  return (
    <div class="minutes-read text-gray-500">
      {props.minutesRead < 1
        ? "1분 미만 소요"
        : `약 ${Math.ceil(props.minutesRead)}분 소요`}
    </div>
  );
};
