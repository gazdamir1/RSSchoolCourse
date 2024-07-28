import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary"
import { store } from "./store/store"
import { Provider } from "react-redux"
import { ThemeProvider } from "./components/theme-provider/ThemeContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
)
