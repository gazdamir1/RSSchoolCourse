import { Component } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results/Results";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { SearchResult } from "./types";
import Loader from "./components/Loader/Loader";
import "./App.css";

interface AppState {
  searchTerm: string;
  results: SearchResult[];
  error: string | null;
  loading: boolean;
}

interface AppProps {}

class App extends Component<AppProps, AppState> {
  state: AppState = {
    searchTerm: localStorage.getItem("searchTerm") || "",
    results: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.fetchResults(this.state.searchTerm);
  }

  fetchResults = async (searchTerm: string) => {
    const trimmedTerm = searchTerm.trim();
    this.setState({ loading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const apiEndpoint = `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}`;

    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      this.setState({
        results: data.results as SearchResult[],
        loading: false,
      });
    } catch (error) {
      this.setState({ error: "Failed to fetch", loading: false });
      this.throwError;
    }
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem("searchTerm", searchTerm);
    this.fetchResults(searchTerm);
  };

  throwError = () => {
    this.fetchResults("Morti");
  };

  render() {
    const { searchTerm, results, error, loading } = this.state;

    return (
      <ErrorBoundary>
        <div className="app">
          <div className="searchSection">
            <SearchBar searchTerm={searchTerm} onSearch={this.handleSearch} />
            <button onClick={this.throwError}>Throw Error</button>
          </div>

          <div className="resultsSection">
            {loading ? <Loader /> : <Results items={results} />}
            {error && <div>Error: {error}</div>}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
