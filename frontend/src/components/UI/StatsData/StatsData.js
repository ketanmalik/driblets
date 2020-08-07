import React from "react";
import "./StatsData.css";

const statsData = (props) => {
  return (
    <div className="statsData-wrapper">
      {props.icon}
      <h1>{props.header}</h1>
      <p>{props.content}</p>
    </div>
  );
};

export default statsData;
