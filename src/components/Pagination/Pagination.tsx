import React from "react"
import styles from "./Pagination.module.css"
import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const MAX_PAGES = 5
  const pages = []
  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES / 2))
  const endPage = Math.min(totalPages, startPage + MAX_PAGES - 1)

  if (endPage - startPage + 1 < MAX_PAGES) {
    startPage = Math.max(1, endPage - MAX_PAGES + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className={styles.arrowLink}>
          {"<"}
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link href={`/?page=1`} className={styles.link}>
            1
          </Link>
          {startPage > 2 && <span className={styles.dots}>...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`/?page=${page}`}
          className={page === currentPage ? styles.activeLink : styles.link}
          onClick={(event) => {
            if (page === currentPage) {
              event.preventDefault()
            } else {
              onPageChange(page)
            }
          }}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.dots}>...</span>}
          <Link href={`/?page=${totalPages}`} className={styles.link}>
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className={styles.arrowLink}>
          {">"}
        </Link>
      )}
    </div>
  )
}

export default Pagination
