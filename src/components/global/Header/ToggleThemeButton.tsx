import useTheme from "@/hooks/useTheme";
import SVGIcon from "@/components/icons/SVGIcon";

const ICON_SIZE = 21;

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn-basic flex-center h-10 w-10 rounded-full">
      {theme === "dark" ? <SVGIcon.LightMode size={ICON_SIZE} /> : <SVGIcon.DarkMode size={ICON_SIZE} />}
    </button>
  );
}

export default ToggleThemeButton;
