import useSearchQuery from "../hooks/useSearchQuery"
import SearchBar from "../components/SearchBar/SearchBar"
import Loader from "../components/Loader/Loader"
import Results from "../components/Results/Results"
import Pagination from "../components/Pagination/Pagination" // Компонент пагинации
import "./Main.css"
import { Outlet, useNavigate } from "react-router-dom"
import useQuery from "../hooks/useQuery"
import { characterAPI } from "../services/CharacterService"
import FlyoutBar from "../components/FlyoutBar/FlyoutBar"
import ThemeSwitcher from "../components/theme-provider/ThemeSwitcher"
import { useTheme } from "../hooks/useTheme"

const Main = () => {
  const [searchTerm, setSearchTerm] = useSearchQuery("searchTerm", "")
  const navigate = useNavigate()
  const query = useQuery()
  const currentPage = parseInt(query.get("page") || "1", 10)
  const detailsId = query.get("details")
  const { data, error, isLoading } = characterAPI.useSearchCharactersQuery({
    name: searchTerm,
    page: currentPage,
  })

  const { theme } = useTheme()

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    navigate(`/?page=1`)
  }

  const onPageChange = (newPage: number) => {
    navigate(`/search/${newPage}`)
  }

  const handleItemClick = (id: number) => {
    navigate(`/details/${id}?page=${currentPage}&details=${id}`)
  }

  return (
    <div className={`container ${theme}`}>
      <div className="main">
        <div className="searchSection">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <ThemeSwitcher />
        </div>

        <div className="contentArea">
          <div className="resultsSection">
            {isLoading && <Loader />}
            {error && <div className="errorLoading">Error Loading</div>}

            {!error && !isLoading && data && data.results.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={data?.info.pages}
                onPageChange={onPageChange}
              />
            )}

            {!error && !isLoading && data && (
              <>
                <Results items={data.results} onItemClick={handleItemClick} />
                <FlyoutBar />
              </>
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
    </div>
  )
}

export default Main
