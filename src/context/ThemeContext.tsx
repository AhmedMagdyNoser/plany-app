import { createContext, useEffect, useState, ReactNode } from "react";
import { ColorTheme, ThemeContextProps } from "@/types/theme";
import { useMantineColorScheme } from "@mantine/core";

const initialTheme: ColorTheme = "dark";

export const ThemeContext = createContext<ThemeContextProps>({ theme: initialTheme, toggleTheme: () => {} });

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ColorTheme>(initialTheme);

  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    let currentTheme = localStorage.getItem("theme");
    if (currentTheme !== "light" && currentTheme !== "dark") {
      currentTheme = initialTheme;
      localStorage.setItem("theme", initialTheme);
    }
    setTheme(currentTheme as ColorTheme);
    setColorScheme(currentTheme as ColorTheme);
    document.documentElement.classList.add(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setColorScheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
