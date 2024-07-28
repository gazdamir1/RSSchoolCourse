import { describe, it, expect } from "vitest"
import { useTheme } from "./useTheme"
import {
  ThemeContext,
  ThemeContextType,
} from "../components/theme-provider/ThemeContext"
import { ReactNode } from "react"
import React from "react"
import { renderHook } from "@testing-library/react"

const ThemeProvider: React.FC<{
  children: ReactNode
  value: ThemeContextType
}> = ({ children, value }) => (
  <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
)

describe("useTheme", () => {
  const themeContextValue: ThemeContextType = {
    theme: "light",
    toggleTheme: () => {},
  }

  it("should return the theme context value when used within a ThemeProvider", () => {
    // Render hook within the ThemeProvider
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider value={themeContextValue}>{children}</ThemeProvider>
      ),
    })

    // Check the values returned by the hook
    expect(result.current).toBe(themeContextValue)
    expect(result.current.theme).toBe("light")
    expect(result.current.toggleTheme).toBeInstanceOf(Function)
  })
})
