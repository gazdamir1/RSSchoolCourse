import { Component } from "react";
import { SearchResult } from "../types";

interface ResultsProps {
  items: SearchResult[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { items } = this.props;
    return (
      <div className="results" style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.status}</p>
            <p>{item.gender}</p>
            <img src={item.image}></img>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
