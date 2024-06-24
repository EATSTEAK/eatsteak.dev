import type { Component } from "solid-js";

export const FormattedDate: Component<{ dateTime: Date }> = (props) => {
  const langCode = document.documentElement.lang || navigator.language;
  const formatter = new Intl.DateTimeFormat(langCode, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <time datetime={props.dateTime.toISOString()}>
      {formatter.format(props.dateTime)}
    </time>
  );
};
