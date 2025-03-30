import nesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import tailwindcss from "@tailwindcss/postcss";

export default {
  plugins: [nesting, autoprefixer, tailwindcss],
};
