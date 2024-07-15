import { useContext } from "react";
import { ThemeContextProps } from "@/types/theme";
import { ThemeContext } from "@/context/ThemeContext";

function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}

export default useTheme;
