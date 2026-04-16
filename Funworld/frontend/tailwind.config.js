/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0d9488",
          orange: "#f97316",
          sky: "#38bdf8",
          yellow: "#facc15",
          rose: "#fb7185",
          midnight: "#0f172a"
        }
      },
      fontFamily: {
        display: ['"Trebuchet MS"', "sans-serif"],
        body: ['"Segoe UI"', "sans-serif"]
      },
      boxShadow: {
        fun: "0 18px 45px rgba(14, 165, 233, 0.18)"
      }
    },
  },
  plugins: [],
};

