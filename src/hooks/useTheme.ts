import { useContext } from "react";
import { ThemeContextProps } from "@/types/theme";
import { ThemeContext } from "@/context/ThemeContext";

function useTheme(): ThemeContextProps {
  const context = useContext(ThemeContext);
  return context;
}

export default useTheme;
