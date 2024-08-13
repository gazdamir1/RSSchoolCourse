import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import FlyoutBar from "../components/FlyoutBar/FlyoutBar"
import {
  SelectedCharactersState,
  unselectAllCharacters,
} from "../store/reducers/SelectedCharacterSlice"
import selectedCharactersReducer from "../store/reducers/SelectedCharacterSlice"
import { ICharacter } from "../types"
import { vi } from "vitest"

describe("FlyoutBar Component", () => {
  let store: ReturnType<typeof configureStore>
  const initialState: SelectedCharactersState = {
    selectedCharacters: [] as ICharacter[],
  }

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "mockedObjectURL")

    store = configureStore({
      reducer: { selectedItems: selectedCharactersReducer },
      preloadedState: {
        selectedItems: initialState,
      },
    })
    store.dispatch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it("renders nothing when no characters are selected", () => {
    render(
      <Provider store={store}>
        <FlyoutBar />
      </Provider>
    )

    expect(screen.queryByText(/items are selected/i)).toBeNull()
  })

  it("renders FlyoutBar and handles 'Unselect all' click", () => {
    const selectedState: SelectedCharactersState = {
      selectedCharacters: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          image: "https://example.com/image.jpg",
          created: "2017-11-04T18:48:46.250Z",
        },
      ],
    }

    store = configureStore({
      reducer: { selectedItems: selectedCharactersReducer },
      preloadedState: {
        selectedItems: selectedState,
      },
    })

    store.dispatch = vi.fn()

    render(
      <Provider store={store}>
        <FlyoutBar />
      </Provider>
    )

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Unselect all/i))

    expect(store.dispatch).toHaveBeenCalledWith(unselectAllCharacters())
  })

  it("generates CSV download link when characters are selected", () => {
    const selectedState: SelectedCharactersState = {
      selectedCharacters: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          image: "https://example.com/image.jpg",
          created: "2017-11-04T18:48:46.250Z",
        },
      ],
    }

    store = configureStore({
      reducer: { selectedItems: selectedCharactersReducer },
      preloadedState: {
        selectedItems: selectedState,
      },
    })

    render(
      <Provider store={store}>
        <FlyoutBar />
      </Provider>
    )

    const downloadLink = screen.getByText(/Download/i) as HTMLAnchorElement
    expect(downloadLink).toBeInTheDocument()
    expect(downloadLink.getAttribute("href")).toBe("mockedObjectURL")
  })
})
