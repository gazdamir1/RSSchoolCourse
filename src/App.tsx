import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./Pages/Main"
import NotFound from "./Pages/NotFoundPage/Notfound"
import Details from "./components/Details/Details"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>}>
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
