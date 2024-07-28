// import React from "react"
// import { render, screen, fireEvent } from "@testing-library/react"
// import FlyoutBar from "./FlyoutBar"
// import { Provider } from "react-redux"
// import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
// import selectedCharactersReducer, {
//   selectCharacter,
// } from "../../store/reducers/SelectedCharacterSlice"
// import { describe, it, expect, beforeEach } from "vitest"
// import { ICharacter } from "../../types"

// const mockSelectedCharacters: ICharacter[] = [
//   {
//     id: 1,
//     name: "Rick Sanchez",
//     status: "Alive",
//     species: "Human",
//     type: "",
//     gender: "Male",
//     image: "https://example.com/rick.png",
//     created: "2021-01-01",
//   },
//   {
//     id: 2,
//     name: "Morty Smith",
//     status: "Alive",
//     species: "Human",
//     type: "",
//     gender: "Male",
//     image: "https://example.com/morty.png",
//     created: "2021-01-01",
//   },
// ]

// const renderWithProviders = (
//   ui: React.ReactElement,
//   { store }: { store: EnhancedStore }
// ) => {
//   return render(<Provider store={store}>{ui}</Provider>)
// }

// describe("FlyoutBar component", () => {
//   let store: EnhancedStore

//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         selectedItems: selectedCharactersReducer,
//       },
//     })

//     // Preload the store with mockSelectedCharacters
//     store.dispatch(selectCharacter(mockSelectedCharacters[0]))
//     store.dispatch(selectCharacter(mockSelectedCharacters[1]))
//   })

//   it("displays the number of selected items", () => {
//     renderWithProviders(<FlyoutBar />, { store })

//     expect(screen.getByText("2 items are selected")).toBeInTheDocument()
//   })

//   it("calls handleUnselectAll when the Unselect all button is clicked", () => {
//     renderWithProviders(<FlyoutBar />, { store })

//     const button = screen.getByText("Unselect all")
//     fireEvent.click(button)

//     expect(store.getState().selectedItems.selectedCharacters).toHaveLength(0)
//   })

//   it("generates a download link with the correct href when Download is clicked", () => {
//     renderWithProviders(<FlyoutBar />, { store })

//     const downloadLink = screen.getByText("Download") as HTMLAnchorElement

//     expect(downloadLink).toHaveAttribute("href")

//     const expectedCsvContent =
//       "id,name,status,species,type,gender,image,created\n1,Rick Sanchez,Alive,Human,,Male,https://example.com/rick.png,2021-01-01\n2,Morty Smith,Alive,Human,,Male,https://example.com/morty.png,2021-01-01\n"
//     const expectedBlob = new Blob([expectedCsvContent], {
//       type: "text/csv;charset=utf-8;",
//     })
//     const expectedUrl = URL.createObjectURL(expectedBlob)

//     expect(downloadLink.href).toBe(expectedUrl)
//   })
// })
