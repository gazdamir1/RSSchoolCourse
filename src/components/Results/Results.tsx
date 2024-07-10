import { Component } from "react";
import { SearchResult } from "../../types";
import "./Results.css";

interface ResultsProps {
  items: SearchResult[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { items } = this.props;
    return (
      <div className="results">
        {items.map((item) => (
          <div key={item.id} className="fullCard">
            <h3>{item.name}</h3>
            <p>{item.status}</p>
            <p>{item.gender}</p>
            <img src={item.image} className="resultImage"></img>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
