import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import SearchBar from "../components/SearchBar/SearchBar"

function mockLocalStorage() {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
    removeItem: (key: string) => {
      delete store[key]
    },
  }
}

describe("SearchBar Component", () => {
  const localStorageMock = mockLocalStorage()

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })
    localStorageMock.clear()
  })

  it("saves the entered value to local storage on clicking the Search button", () => {
    const searchTerm = "Rick Sanchez"
    const handleSearch = (term: string) => {
      localStorage.setItem("searchTerm", term)
    }

    render(<SearchBar searchTerm="" onSearch={handleSearch} />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: searchTerm },
    })
    fireEvent.click(screen.getByRole("button", { name: /search/i }))

    expect(localStorage.getItem("searchTerm")).toBe(searchTerm)
  })

  it("retrieves the value from local storage upon mounting", () => {
    const searchTerm = "Morty Smith"
    localStorage.setItem("searchTerm", searchTerm)

    render(<SearchBar searchTerm={searchTerm} onSearch={() => {}} />)

    expect(screen.getByRole("textbox")).toHaveValue(searchTerm)
  })
})
