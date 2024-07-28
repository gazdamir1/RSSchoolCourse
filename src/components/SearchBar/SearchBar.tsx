import React, { useState } from "react"
import "./SearchBar.css"

interface SearchBarProps {
  searchTerm: string
  onSearch: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [searchTermState, setSearchTermState] = useState<string>(searchTerm)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchTermState)
  }

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={searchTermState}
        onChange={handleChange}
      />
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  )
}

export default SearchBar
