/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "gilroy-bold": ["Gilroy Bold"],
        "gilroy": ["Gilroy"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
