import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Details from "./Details"
import { characterAPI } from "../../services/CharacterService"
import { ICharacter } from "../../types"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"

const mockCharacter: ICharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  created: "2017-11-04T18:48:46.250Z",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
}

const mockFetchCharacterDetailsQuery = vi.spyOn(
  characterAPI,
  "useFetchCharacterDetailsQuery"
)

describe("Details Component", () => {
  beforeEach(() => {
    mockFetchCharacterDetailsQuery.mockReturnValue({
      data: mockCharacter,
      error: null,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    })
  })

  it("should display a loading indicator while fetching data", () => {
    mockFetchCharacterDetailsQuery.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true,
      isFetching: true,
      refetch: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByTestId("Loader")).toBeInTheDocument()
  })

  it("should correctly display the detailed card data", async () => {
    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument()
    )
    expect(screen.getByText(/Status:/i)).toHaveTextContent("Status: Alive")
    expect(screen.getByText(/Species:/i)).toHaveTextContent("Species: Human")
    expect(screen.getByText(/Gender:/i)).toHaveTextContent("Gender: Male")
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument()
  })

  it("should display an error message if there is an error", async () => {
    mockFetchCharacterDetailsQuery.mockReturnValueOnce({
      data: null,
      error: true as unknown as FetchBaseQueryError,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() =>
      expect(screen.getByText("Loading error")).toBeInTheDocument()
    )
  })

  it("should display a message if there is no data", async () => {
    mockFetchCharacterDetailsQuery.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => expect(screen.getByText("No data")).toBeInTheDocument())
  })
})
