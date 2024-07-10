export type ColorTheme = "light" | "dark";

export interface ThemeContextProps {
  theme: ColorTheme;
  toggleTheme: () => void;
}
