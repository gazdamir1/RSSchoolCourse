import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"
import NotFoundPage from "./Notfound"

describe("NotFoundPage", () => {
  it("renders the 404 message", () => {
    render(<NotFoundPage />)
    expect(screen.getByText("404 - Not Found")).toBeInTheDocument()
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument()
  })
})
