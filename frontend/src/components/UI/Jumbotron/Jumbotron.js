import React from "react";
import "./Jumbotron.css";

const jumbotron = (props) => {
  return <div className="jumbotron">{props.children}</div>;
};

export default jumbotron;
