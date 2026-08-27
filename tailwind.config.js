/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        body: "#55534E",
        navy: {
          DEFAULT: "#4A2340",
          hover: "#351930",
        },
        berry: {
          DEFAULT: "#9B2F52",
          tint: "#F9EEF2",
        },
        border: "#E9E7E2",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: [],
}
