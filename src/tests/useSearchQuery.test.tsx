import { describe, it, expect, beforeEach } from "vitest"
import useSearchQuery from "../hooks/useSearchQuery"
import { renderHook, act } from "@testing-library/react"
import { waitFor } from "@testing-library/react"

describe("useSearchQuery", () => {
  const key = "searchTerm"
  const initialValue = "initialValue"

  beforeEach(() => {
    localStorage.clear()
  })

  it("should return initial value if there is no saved value", () => {
    const { result } = renderHook(() => useSearchQuery(key, initialValue))

    const [value] = result.current
    expect(value).toBe(initialValue)
  })

  it("should return saved value from localStorage if it exists", () => {
    const savedValue = "savedValue"
    localStorage.setItem(key, savedValue)

    const { result } = renderHook(() => useSearchQuery(key, initialValue))

    const [value] = result.current
    expect(value).toBe(savedValue)
  })

  it("should update value and save it to localStorage", async () => {
    const { result } = renderHook(() => useSearchQuery(key, initialValue))

    expect(result.current[0]).toBe(initialValue)

    act(() => {
      const [, setValue] = result.current
      setValue("newValue")
    })

    expect(result.current[0]).toBe("newValue")

    await waitFor(() => {
      expect(localStorage.getItem(key)).toBe("newValue")
    })
  })

  it("should save the value to localStorage when unmounted", async () => {
    const { result, unmount } = renderHook(() =>
      useSearchQuery(key, initialValue)
    )

    const [, setValue] = result.current

    act(() => {
      setValue("newValue")
    })

    unmount()

    await waitFor(() => {
      expect(localStorage.getItem(key)).toBe("newValue")
    })
  })
})
