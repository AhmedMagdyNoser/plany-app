import useTheme from "@/hooks/useTheme";
import outlineIcons from "@/components/icons/outline";
import solidIcons from "@/components/icons/solid";

const ICON_SIZE = 21;

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn-basic flex-center h-10 w-10 rounded-full p-0">
      {theme === "dark" ? <solidIcons.LightMode size={ICON_SIZE} /> : <outlineIcons.DarkMode size={ICON_SIZE} />}
    </button>
  );
}
