/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    require("@aparajita/tailwind-ionic"),
  ],
};
