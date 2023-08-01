const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D1E07366",
        secondary: "#D1E073",
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
