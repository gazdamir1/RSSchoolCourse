import { render, screen, fireEvent } from "@testing-library/react"
import Results from "./Results"
import { SearchResult } from "../../types"
import { describe, it, expect, vi } from "vitest"

const mockResults: SearchResult[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    image: "https://example.com/rick.png",
    created: "2021-01-01",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    image: "https://example.com/morty.png",
    created: "2021-01-01",
  },
]

describe("Results component", () => {
  it("renders the specified number of cards", () => {
    render(<Results items={mockResults} onItemClick={() => {}} />)

    const cards = screen.getAllByRole("heading", { name: /./i })
    expect(cards).toHaveLength(mockResults.length)
  })

  it("displays an appropriate message if no cards are present", () => {
    render(<Results items={[]} onItemClick={() => {}} />)

    expect(screen.getByText("No results found")).toBeInTheDocument()
  })

  it("renders the relevant card data", () => {
    render(<Results items={mockResults} onItemClick={() => {}} />)

    mockResults.forEach((result) => {
      expect(screen.getByText(result.name)).toBeInTheDocument()
    })
  })

  it("opens a detailed card component when a card is clicked", () => {
    const handleItemClick = vi.fn()

    render(<Results items={mockResults} onItemClick={handleItemClick} />)

    const firstCard = screen.getByText(mockResults[0].name)
    fireEvent.click(firstCard)

    expect(handleItemClick).toHaveBeenCalledWith(mockResults[0].id)
  })
})
