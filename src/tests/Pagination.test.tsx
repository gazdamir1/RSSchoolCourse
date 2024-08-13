import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Pagination from "../components/Pagination/Pagination"
import { describe, it, expect, beforeEach } from "vitest"

describe("Pagination Component", () => {
  let onPageChange: { (pageNumber: number): void; calledWith?: number | null }

  beforeEach(() => {
    onPageChange = (pageNumber: number) => {
      onPageChange.calledWith = pageNumber
      console.log(`Page changed to ${pageNumber}`)
    }

    onPageChange.calledWith = null
  })

  const renderComponent = (currentPage: number, totalPages: number) => {
    return render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    )
  }

  it("should update URL query parameter when page changes", () => {
    const { container } = renderComponent(1, 10)

    const secondPageLink = container.querySelector('a[href="/?page=2"]')
    expect(secondPageLink).toBeInTheDocument()
    if (secondPageLink) {
      fireEvent.click(secondPageLink)
    }

    expect(onPageChange.calledWith).toBe(2)
  })
})
