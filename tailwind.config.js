/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FADCE1",
        mint: "#DFF6ED",
        sky: "#DDEBFF",
        lilac: "#EADFFB",
        peach: "#FFE3D1",
        rose: "#F9B6C7",
        berry: "#D85A9C",
        bubble: "#FFF4F8",
        ink: "#1F2937",
      },
      boxShadow: {
        card: "0 12px 40px rgba(31, 41, 55, 0.12)",
        glow: "0 18px 45px rgba(216, 90, 156, 0.2)",
      },
    },
  },
  plugins: [],
};
