import { useContext } from "react";
import { ThemeContextProps } from "@/types/theme";
import { ThemeContext } from "@/context/ThemeContext";

function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export default useTheme;
