import { Component, ErrorInfo, ReactNode } from "react"
import styles from "./ErrorBoundary.module.css"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  errorMessage: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, errorMessage: "" }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  public clearLocalStorage = () => {
    localStorage.setItem("searchTerm", "")
    location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.box}>
          <div className="errorTitle">
            Error occurred, see console for more details.{" "}
            {this.state.errorMessage}
          </div>
          <button
            onClick={this.clearLocalStorage}
            className={styles.errorButton}
          >
            Clear
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
