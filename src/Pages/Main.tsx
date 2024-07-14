import { useCallback, useEffect, useState } from "react"
import useSearchQuery from "../hooks/useSearchQuery"
import { SearchResult } from "../types"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary"
import SearchBar from "../components/SearchBar/SearchBar"
import Loader from "../components/Loader/Loader"
import Results from "../components/Results/Results"
import Pagination from "../components/Pagination/Pagination" // Компонент пагинации
import "./Main.css"
import { Outlet, useNavigate } from "react-router-dom"
import useQuery from "../hooks/useQuery"

const Main = () => {
  const [searchTerm, setSearchTerm] = useSearchQuery("searchTerm", "")
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const query = useQuery()
  const currentPage = parseInt(query.get("page") || "1", 10)
  const [totalPages, setTotalPages] = useState<number>(1)
  const detailsId = query.get("details")

  const fetchResults = useCallback(async (searchTerm: string, page: number) => {
    const trimmedTerm = searchTerm.trim()
    setLoading(true)
    setError(null)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const apiEndpoint = `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}&page=${page}`

    try {
      const response = await fetch(apiEndpoint)
      const data = await response.json()
      setResults(data.results as SearchResult[])
      setTotalPages(data.info.pages)
      setLoading(false)
    } catch (error) {
      setError("Failed to fetch")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults(searchTerm, currentPage)
  }, [searchTerm, currentPage, fetchResults])

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    navigate(`/?page=1`)
    fetchResults(searchTerm, 1)
  }

  const throwError = () => {
    fetchResults("Morti", currentPage)
  }

  const onPageChange = (newPage: number) => {
    navigate(`/search/${newPage}`)
  }

  const handleCloseDetails = () => {
    navigate(`?page=${currentPage}`)
  }

  const handleItemClick = (id: number) => {
    navigate(`/details/${id}?page=${currentPage}&details=${id}`)
  }

  return (
    <ErrorBoundary>
      <div className="main">
        <div className="searchSection">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <button onClick={throwError}>Throw Error</button>
        </div>

        <div className="contentArea">
          <div
            className="resultsSection"
            onClick={detailsId ? handleCloseDetails : () => {}}
          >
            {loading ? (
              <Loader />
            ) : (
              <Results items={results} onItemClick={handleItemClick} />
            )}
            {error && <div>Error: {error}</div>}
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
          {detailsId ? (
            <div className="detailsArea">
              <Outlet />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Main
