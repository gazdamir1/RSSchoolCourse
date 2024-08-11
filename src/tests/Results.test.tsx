import { render, screen, fireEvent } from "@testing-library/react"
import Results from "../components/Results/Results"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { ICharacter } from "../types"
import { Provider } from "react-redux"
import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import selectedCharactersReducer from "../store/reducers/SelectedCharacterSlice"
import { characterAPI } from "../services/CharacterService"

const mockResults: ICharacter[] = [
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

const renderWithProviders = (
  ui: React.ReactElement,
  { store }: { store: EnhancedStore }
) => {
  return render(<Provider store={store}>{ui}</Provider>)
}

describe("Results component", () => {
  let store: EnhancedStore

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [characterAPI.reducerPath]: characterAPI.reducer,
        selectedItems: selectedCharactersReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(characterAPI.middleware),
    })
  })

  it("renders the specified number of cards", () => {
    renderWithProviders(
      <Results items={mockResults} onItemClick={() => {}} />,
      { store }
    )

    const cards = screen.getAllByRole("heading", { name: /./i })
    expect(cards).toHaveLength(mockResults.length)
  })

  it("displays an appropriate message if no cards are present", () => {
    renderWithProviders(<Results items={[]} onItemClick={() => {}} />, {
      store,
    })

    expect(screen.getByText("No results found")).toBeInTheDocument()
  })

  it("renders the relevant card data", () => {
    renderWithProviders(
      <Results items={mockResults} onItemClick={() => {}} />,
      { store }
    )

    mockResults.forEach((result) => {
      expect(screen.getByText(result.name)).toBeInTheDocument()
    })
  })

  it("calls onItemClick with the correct id when the Open Details button is clicked", () => {
    const handleItemClick = vi.fn()

    renderWithProviders(
      <Results items={mockResults} onItemClick={handleItemClick} />,
      { store }
    )

    const openDetailsButtons = screen.getAllByText("Open Details")
    fireEvent.click(openDetailsButtons[0])

    expect(handleItemClick).toHaveBeenCalledWith(mockResults[0].id)
  })

  it("toggles character selection when checkbox is clicked", () => {
    renderWithProviders(
      <Results items={mockResults} onItemClick={() => {}} />,
      { store }
    )

    const checkboxes = screen.getAllByRole("checkbox")

    // Initially unselected
    expect(checkboxes[0]).not.toBeChecked()
    fireEvent.click(checkboxes[0])
    expect(store.getState().selectedItems.selectedCharacters).toContainEqual(
      mockResults[0]
    )

    // Simulate selection state
    fireEvent.click(checkboxes[0])
    expect(
      store.getState().selectedItems.selectedCharacters
    ).not.toContainEqual(mockResults[0])
  })
})
