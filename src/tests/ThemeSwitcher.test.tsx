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

    // Используем id для поиска checkbox
    const checkbox = screen.getByRole("checkbox", { name: "" }) // Пустое имя, так как aria-label отсутствует
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked() // Light theme should not be checked

    const themeText = screen.getByText("Theme")
    expect(themeText).toBeInTheDocument()
  })

  it("renders correctly with dark theme", () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: "dark",
      toggleTheme: vi.fn(),
    })

    render(<ThemeSwitcher />)

    // Используем id для поиска checkbox
    const checkbox = screen.getByRole("checkbox", { name: "" }) // Пустое имя, так как aria-label отсутствует
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked() // Dark theme should be checked

    const themeText = screen.getByText("Theme")
    expect(themeText).toBeInTheDocument()
  })
})
