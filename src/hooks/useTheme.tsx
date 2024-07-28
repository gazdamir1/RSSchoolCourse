import { useContext } from "react"
import {
  ThemeContext,
  ThemeContextType,
} from "../components/theme-provider/ThemeContext"

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
