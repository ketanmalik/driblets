import React from "react";
import { Button } from "semantic-ui-react";
import "./Btn.css";

const btn = (props) => {
  let type = props.type ? props.type : "primary";
  return (
    <Button
      onClick={props.clicked}
      className={type}
      style={{ width: props.width, margin: props.margin }}
    >
      {props.text}
    </Button>
  );
};

export default btn;
