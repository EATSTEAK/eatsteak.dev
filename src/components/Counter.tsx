import {
  type JSX,
  type Component,
  createResource,
  createSignal,
} from "solid-js";

const fetchCount = async (path: string): Promise<number> => {
  const normalizedPath = path.endsWith("/") ? path.substring(0, path.length - 1) : path;
  let json = (await (
    await fetch(`https://eatsteak.goatcounter.com/counter/${normalizedPath}.json`)
  ).json()) as { count: string; count_unique: string };
  return parseInt(json.count);
};

export const Counter: Component<{ path: string }> = (props) => {
  const [count] = createResource(props.path, fetchCount);
  return (
    <span class="text-gray-500">
      {count() ?? 0}회 조회{" "}
      <a class="text-xs" href="https://goatcounter.com">
        by Goatcounter
      </a>
    </span>
  );
};
