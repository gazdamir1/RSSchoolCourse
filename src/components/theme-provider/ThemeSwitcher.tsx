import { useTheme } from "../../hooks/useTheme"
import styles from "./ThemeSwitcher.module.css"

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.toggleSwitch}>
      <input
        type="checkbox"
        id="toggle"
        className={styles.toggleInput}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="toggle" className={styles.toggleLabel}></label>
      <div className={styles.themeText}>Theme</div>
    </div>
  )
}

export default ThemeSwitcher
