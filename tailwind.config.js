module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: { center: true },
      animation: {
        "fade-in": "fade-in 0.35s",
        progress: "progress 0.35s",
      },
    },
  },
};
