import useTheme from "@/hooks/useTheme";
import outlineIcons from "@/components/icons/outline";
import solidIcons from "@/components/icons/solid";

const ICON_SIZE = 21;

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn-basic flex items-center gap-2 py-4">
      {theme === "dark" ? (
        <>
          <solidIcons.LightMode size={ICON_SIZE} />
          Light Mode
        </>
      ) : (
        <>
          <outlineIcons.DarkMode size={ICON_SIZE} />
          Dark Mode
        </>
      )}
    </button>
  );
}
