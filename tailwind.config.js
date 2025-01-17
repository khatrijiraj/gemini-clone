/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // gradientStart: "#5282ed", // Blue
        gradientStart: "#5282ed", // Blue
        gradientMiddle: "#a370bf", // Purple
        gradientEnd: "#d76572", // Red
      },
      keyframes: {
        barMove: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
      },
      animation: {
        barMove: "barMove 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
