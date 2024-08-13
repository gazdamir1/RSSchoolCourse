import React from "react"
import useSearchQuery from "../../hooks/useSearchQuery"
import { useTheme } from "../../hooks/useTheme"
import { characterAPI } from "../../services/CharacterService"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./Main.module.css"
import { useRouter } from "next/router"
import ThemeSwitcher from "../theme-provider/ThemeSwitcher"
import Loader from "../Loader/Loader"
import Pagination from "../Pagination/Pagination"
import Results from "../Results/Results"
import FlyoutBar from "../FlyoutBar/FlyoutBar"

interface MainProps {
  children: React.ReactNode
}

const MainPage: React.FC<MainProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useSearchQuery("searchTerm", "")
  const router = useRouter()
  const { query } = router
  const currentPage = parseInt((query.page as string) || "1", 10)
  const detailsId = query.details as string
  const { data, error, isLoading } = characterAPI.useSearchCharactersQuery({
    name: searchTerm,
    page: currentPage,
  })

  const { theme } = useTheme()

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    router.push(`/?page=1`)
  }

  const onPageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`)
  }

  const handleItemClick = (id: number) => {
    router.push(`/details/${id}?page=${currentPage}&details=${id}`)
  }

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.main}>
        <div className={styles.searchSection}>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <ThemeSwitcher />
        </div>

        <div className={styles.contentArea}>
          <div className={styles.resultsSection}>
            {isLoading && <Loader />}
            {error && <div className={styles.errorLoading}>Error Loading</div>}

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
          {detailsId && <div className={styles.detailsArea}>{children}</div>}
        </div>
      </div>
    </div>
  )
}

export default MainPage
