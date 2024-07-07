import { Component } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import { SearchResult } from './types';
import ErrorButton from './components/ErrorButton';

interface AppState {
  searchTerm: string;
  results: SearchResult[];
  error: Error | null;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [],
    error: null,
  };

  componentDidMount() {
    this.fetchResults(this.state.searchTerm);
  }

  fetchResults = (searchTerm: string) => {
    const trimmedTerm = searchTerm.trim();
    const apiEndpoint = `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}`;

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => this.setState({ results: data.results as SearchResult[] }))
      .catch((error) => {
        this.setState({ error: error });
        throw error;
      });
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
    this.fetchResults(searchTerm);
  };

  render() {
    const { searchTerm, results, error } = this.state;

    if (error) {
      throw error;
    }

    return (
      <ErrorBoundary>
        <div className="app">
          <SearchBar searchTerm={searchTerm} onSearch={this.handleSearch} />
          <ErrorButton />
          <Results items={results} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
