import React from "react"
import { SearchResult } from "../../types"
import "./Results.css"

interface ResultsProps {
  items: SearchResult[]
  onItemClick: (id: number) => void
}

const Results: React.FC<ResultsProps> = ({ items, onItemClick }) => {
  return (
    <div className="results">
      {items.map((item) => (
        <div
          key={item.id}
          className="fullCard"
          onClick={() => onItemClick(item.id)}
        >
          <h3 className="charName">{item.name}</h3>
          <img src={item.image} className="resultImage"></img>
        </div>
      ))}
    </div>
  )
}

export default Results
