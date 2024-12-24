import nesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
  plugins: [nesting, autoprefixer, cssnano],
};
