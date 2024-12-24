import calculateReadingTime from "reading-time";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";

export const getReadingTime = (text: string): number | undefined => {
  if (!text || !text.length) return undefined;
  try {
    const { minutes } = calculateReadingTime(toString(fromMarkdown(text)));
    if (minutes && minutes > 0) {
      return minutes;
    }
    return undefined;
  } catch {
    return undefined;
  }
};
