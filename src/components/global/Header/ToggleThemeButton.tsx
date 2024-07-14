import useTheme from "@/hooks/useTheme";
import SVGIcon from "@/components/icons/SVGIcon";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn-d rounded-xl px-2">
      {theme === "dark" ? (
        <SVGIcon.LightMode className="text-yellow-500" />
      ) : (
        <SVGIcon.DarkMode className="text-l-txt-semi" />
      )}
    </button>
  );
}

export default ToggleThemeButton;
