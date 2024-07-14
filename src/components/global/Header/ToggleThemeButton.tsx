import useTheme from "@/hooks/useTheme";
import SVGIcon from "@/components/icons/SVGIcon";

const ICON_SIZE = 21;

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn-d rounded-full px-2">
      {theme === "dark" ? (
        <SVGIcon.LightMode className="text-yellow-500" size={ICON_SIZE} />
      ) : (
        <SVGIcon.DarkMode className="text-l-txt-semi" size={ICON_SIZE} />
      )}
    </button>
  );
}

export default ToggleThemeButton;
