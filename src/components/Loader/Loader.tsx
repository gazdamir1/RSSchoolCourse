import { Component } from "react";
import "./Loader.css";
import loader from "../../assets/loader.svg";

export class Loader extends Component {
  render() {
    return (
      <div className="loaderWrapper">
        <img src={loader} className="loader"></img>
      </div>
    );
  }
}

export default Loader;
