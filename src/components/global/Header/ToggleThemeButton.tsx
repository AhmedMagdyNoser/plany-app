import useTheme from "@/hooks/useTheme";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn-d rounded-full px-4">
      {theme === "dark" ? "🌞" : "🌚"}
    </button>
  );
}

export default ToggleThemeButton;
