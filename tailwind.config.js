const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9EE073",
        secondary: "#CBE6BA",
        negative: "#EE3D3D80",
      },
    },
    screens: {
      "2xs": "320px",
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
