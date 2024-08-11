import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary"

const ProblematicComponent = () => {
  throw new Error("Test error")
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    ;(console.error as jest.Mock).mockRestore()
  })

  it("catches errors and displays an error message", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    )

    expect(
      screen.getByText(/Error occurred, see console for more details/i)
    ).toBeInTheDocument()
  })

  it("clears localStorage and reloads the page when Clear button is clicked", () => {
    localStorage.setItem("searchTerm", "test")

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    )

    fireEvent.click(screen.getByText("Clear"))

    expect(localStorage.getItem("searchTerm")).toBe("")
  })
})
