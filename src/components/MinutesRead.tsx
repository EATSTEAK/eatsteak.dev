import { type JSX, type Component, For } from "solid-js";

export const MinutesRead: Component<{ minutesRead: number }> = (props) => {
    return (
        <div class="minutes-read text-gray-500">
            {props.minutesRead < 1
                ? "1분 미만 소요"
                : `약 ${Math.round(props.minutesRead)}분 소요`}
        </div>
    );
};
