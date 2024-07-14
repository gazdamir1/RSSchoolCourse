import React, { Component } from "react"
import "./SearchBar.css"

interface SearchBarProps {
  searchTerm: string
  onSearch: (searchTerm: string) => void
}

interface SearchBarState {
  searchTerm: string
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchTerm: this.props.searchTerm,
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value })
  }

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm)
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    )
  }
}

export default SearchBar