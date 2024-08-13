import React from "react"
import "../styles/global.css"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary"
import { store } from "../store/store"
import { Provider } from "react-redux"
import { ThemeProvider } from "../components/theme-provider/ThemeContext"
import { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
