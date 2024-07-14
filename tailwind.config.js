module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: { center: true },
      colors: {
        primary: {
          DEFAULT: "#1E90F5",
          semi: "#45A1F5",
        },
        // for light mode
        l: {
          txt: {
            DEFAULT: "#1F2945", // headings
            semi: "#4C525C", // paragraphs
          },
          bg: {
            1: "#FAFBFD", // Almost white
            2: "#f3f4f6", // A little darker
            3: "#e5e7eb", // A little darker
            4: "#d5d8df", // A little darker
            5: "#EAF5FF", // A light version of the primary color
            6: "#d2ecff", // A very light version of the primary color
          },
        },
        // for dark mode
        d: {
          txt: {
            DEFAULT: "#EFf5f8", // headings
            semi: "#C5CFD5", // paragraphs
          },
          bg: {
            1: "#0a0c12", // Almost black
            2: "#0e1521", // A little lighter
            3: "#1f2935", // A little lighter
            4: "#283042", // A little lighter
            5: "#1E293B", // A dark version of the primary color
            6: "#283550", // A very dark version of the primary color
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s",
        progress: "progress 0.35s",
      },
    },
  },
};
