import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { useContext } from "react"
import {
  ThemeProvider,
  ThemeContext,
} from "../components/theme-provider/ThemeContext"

const TestComponent = () => {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    return null
  }

  const { theme, toggleTheme } = themeContext

  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-theme")
  })

  it("provides the default theme and allows toggling", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText("Current theme: light")).toBeInTheDocument()
    expect(document.documentElement.getAttribute("data-theme")).toBe("light")

    const button = screen.getByText("Toggle Theme")
    fireEvent.click(button)

    expect(screen.getByText("Current theme: dark")).toBeInTheDocument()
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
  })

  it("respects the theme stored in localStorage", () => {
    localStorage.setItem("theme", "dark")

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByText("Current theme: dark")).toBeInTheDocument()
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark")

    const button = screen.getByText("Toggle Theme")
    fireEvent.click(button)

    expect(screen.getByText("Current theme: light")).toBeInTheDocument()
    expect(document.documentElement.getAttribute("data-theme")).toBe("light")
  })
})
