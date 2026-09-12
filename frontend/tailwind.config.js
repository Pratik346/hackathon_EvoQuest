export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#b829f7",
          pink: "#ff2e97",
          cyan: "#00f0ff",
        },
        bg: {
          dark: "#0a0a12",
        },
      },
      boxShadow: {
        glow: "0 0 12px rgba(184, 41, 247, 0.6)",
      },
    },
  },
  plugins: [],
};