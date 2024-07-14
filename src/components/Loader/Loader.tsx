import React from "react"
import "./Loader.css"
import loader from "../../assets/loader.svg"

const Loader: React.FC = () => {
  return (
    <div className="loaderWrapper">
      <img src={loader} className="loader" alt="Loading..." />
    </div>
  )
}

export default Loader
