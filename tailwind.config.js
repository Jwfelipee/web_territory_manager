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
      backgroundImage: {
        'territory-green-1': "url('/public/territory_green_1.jpg')",
        'territory-green-2': "url('/public/territory_green_2.jpg')",
        'territory-black-1': "url('/public/territory_black_1.jpg')",
        'territory-black-2': "url('/public/territory_black_1.jpg')",
      }
    },
    screens: {
      "2xs": "320px",
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
