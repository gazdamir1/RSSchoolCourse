"use client"

import { useState, useEffect } from "react"

const useSearchQuery = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue)
  const isClient = typeof window !== "undefined"

  useEffect(() => {
    if (isClient) {
      const saved = localStorage.getItem(key)
      if (saved !== null) {
        setValue(saved)
      }
    }
  }, [isClient, key])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, value)
    }
  }, [isClient, key, value])

  return [value, setValue] as const
}

export default useSearchQuery
