import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, errorMessage: "" };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  public clearLocalStorage = () => {
    localStorage.setItem("searchTerm", "");
    location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          (
          <div style={{ color: "red", marginLeft: "10px" }}>
            Error occurred, see console for more details.
            {this.state.errorMessage}
            <button onClick={this.clearLocalStorage}>Clear</button>
          </div>
          )
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
