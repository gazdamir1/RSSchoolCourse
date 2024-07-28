import { describe, it, expect, beforeEach } from "vitest"
import useSearchQuery from "./useSearchQuery"
import { renderHook } from "@testing-library/react"
import { act } from "react"

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

  it("should update value and save it to localStorage", () => {
    const { result } = renderHook(() => useSearchQuery(key, initialValue))

    // Проверка начального значения
    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBeNull()

    // Обновление значения
    act(() => {
      const [, setValue] = result.current
      setValue("newValue")
    })

    // Проверка нового значения в состоянии после обновления
    expect(result.current[0]).toBe("newValue")

    // Добавление задержки для ожидания выполнения useEffect
    setTimeout(() => {
      // Проверка значения в localStorage
      const savedValue = localStorage.getItem(key)
      expect(savedValue).toBe("newValue")
    }, 0)
  })

  it("should save the value to localStorage when unmounted", () => {
    const { result, unmount } = renderHook(() =>
      useSearchQuery(key, initialValue)
    )

    const [, setValue] = result.current

    act(() => {
      setValue("newValue")
    })

    unmount()

    expect(localStorage.getItem(key)).toBe("newValue")
  })
})
