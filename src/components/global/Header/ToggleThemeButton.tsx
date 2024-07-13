import useTheme from "@/hooks/useTheme";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="btn-d rounded-xl px-2">
      {theme === "dark" ? "🌞" : "🌚"}
    </button>
  );
}

export default ToggleThemeButton;
