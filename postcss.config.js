/* eslint-disable no-undef */
// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };
// import tailwindcss from "@tailwindcss/postcss";

// export default {
//   plugins: [tailwindcss(), require("autoprefixer")],
// };
// module.exports = {
//   plugins: [require("@tailwindcss/postcss")(), require("autoprefixer")],
// };
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
