/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: "#fcf3ec",
      },
      keyframes: {
        "blow-out": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
          "100%": { opacity: "0", transform: "scale(1.5)" },
        },
      },
      animation: {
        "blow-out": "blow-out 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
