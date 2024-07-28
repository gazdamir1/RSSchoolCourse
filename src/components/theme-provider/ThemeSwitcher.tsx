import { useTheme } from "../../hooks/useTheme"
import "./ThemeSwitcher.css"

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        id="toggle"
        className="toggle-input"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="toggle" className="toggle-label"></label>
      <div className="themeText">Theme</div>
    </div>
  )
}

export default ThemeSwitcher
