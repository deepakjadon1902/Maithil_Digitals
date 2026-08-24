/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1F2040",
        deep: "#111226",
        ink: "#0B0C18",
        orange: "#F06A00",
        orangeHover: "#FF7A14",
        bone: "#F7F7F5",
        soft: "#F1F1EE",
        muted: "#A6A7B3"
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Manrope", "sans-serif"]
      },
      borderRadius: {
        premium: "8px"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(240, 106, 0, 0.18)"
      }
    }
  },
  plugins: []
};
