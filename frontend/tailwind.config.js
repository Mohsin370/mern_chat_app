/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "gilroy-bold": ["Gilroy Bold"],
        gilroy: ["Gilroy"],
        "gilroy-medium": ['Gilroy Medium']
      },
      colors: {
        primary: {
          DEFAULT: "#353535",
          light: "#8594AB",
        },
        secondary: {
          DEFAULT: "#6A4DFF",
          light: "#bbaffb",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar": {
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#6A4DFF",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
