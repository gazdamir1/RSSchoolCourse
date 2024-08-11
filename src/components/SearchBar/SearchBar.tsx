import React, { useState, useEffect } from "react"
import styles from "./SearchBar.module.css"

interface SearchBarProps {
  searchTerm: string
  onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [searchTermState, setSearchTermState] = useState<string>(searchTerm)

  useEffect(() => {
    setSearchTermState(searchTerm)
  }, [searchTerm])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchTermState)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchTermState}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  )
}

export default SearchBar
