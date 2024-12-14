export const hexToRgb = (hex: string) => {
  let hexsplit = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_m, r, g, b) => "#" + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g);
  if (hexsplit == null) return [];
  return hexsplit.map((x) => parseInt(x, 16) ?? 0);
};
