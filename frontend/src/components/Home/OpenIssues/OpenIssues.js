import React from "react";
import WebMap from "../../UI/WebMap/WebMap";
import "./OpenIssues.css";

const openIssues = (props) => {
  return (
    <div className="oi-wrapper">
      <div className="oi-heading">
        <h1>Current Water Leakages</h1>
      </div>
      <div className="oi-map">
        <WebMap mode="home" />
      </div>
    </div>
  );
};

export default openIssues;
