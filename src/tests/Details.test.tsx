// src/tests/Details.test.tsx
import React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import Details from "../components/Details/Details"
import { store } from "../store/store"
import { Provider } from "react-redux"
import { mockRouter } from "../__mocks__/next/router"
import { mockUseFetchCharacterDetailsQuery } from "./mocks/character-service-mock"

const mockPush = vi.fn()
vi.mock("next/router", () => ({
  useRouter: () => ({
    query: { page: "1" },
    push: mockPush,
  }),
}))

// Мок функции useNavigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

// Подключаем моки роутера
vi.mock("next/router", () => ({
  useRouter: () => mockRouter,
}))

// Подключаем моки CharacterService
vi.mock("../../services/CharacterService", () => ({
  characterAPI: {
    useFetchCharacterDetailsQuery: mockUseFetchCharacterDetailsQuery,
  },
}))

describe("Details Component", () => {
  beforeEach(() => {
    mockUseFetchCharacterDetailsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("renders loading state correctly", () => {
    render(
      <Provider store={store}>
        <Details />
      </Provider>
    )

    const loadingElement = screen.getByAltText("Loading...")
    expect(loadingElement).toBeInTheDocument()
  })
})
