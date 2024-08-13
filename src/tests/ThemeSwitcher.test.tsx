import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import ThemeSwitcher from "../components/theme-provider/ThemeSwitcher"
import { useTheme } from "../hooks/useTheme"

vi.mock("../hooks/useTheme", () => ({
  useTheme: vi.fn(),
}))

describe("ThemeSwitcher Component", () => {
  beforeEach(() => {
    ;(useTheme as jest.Mock).mockClear()
  })

  it("renders correctly with light theme", () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: "light",
      toggleTheme: vi.fn(),
    })

    render(<ThemeSwitcher />)

    const checkbox = screen.getByRole("checkbox", { name: "" })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()

    const themeText = screen.getByText("Theme")
    expect(themeText).toBeInTheDocument()
  })

  it("renders correctly with dark theme", () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      toggleTheme: vi.fn(),
    })

    render(<ThemeSwitcher />)

    const checkbox = screen.getByRole("checkbox", { name: "" })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()

    const themeText = screen.getByText("Theme")
    expect(themeText).toBeInTheDocument()
  })
})
