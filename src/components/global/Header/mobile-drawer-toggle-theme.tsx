import useTheme from "@/hooks/useTheme";
import SVGIcon from "@/components/icons/SVGIcon";

const ICON_SIZE = 21;

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn-basic flex items-center gap-2 py-4">
      {theme === "dark" ? (
        <>
          <SVGIcon.LightMode size={ICON_SIZE} />
          Light Mode
        </>
      ) : (
        <>
          <SVGIcon.DarkMode size={ICON_SIZE} />
          Dark Mode
        </>
      )}
    </button>
  );
}
