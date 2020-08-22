import React from "react";
import { Step } from "semantic-ui-react";
import SingleStep from "./SingleStep";
import "./Steps.css";

const steps = (props) => {
  let bool = false;
  let steps = props.data.map((key) => {
    let active = false;
    if (!key.completed) {
      if (!bool) {
        active = true;
        bool = true;
      }
    }
    return (
      <SingleStep
        active={active}
        completed={key.completed}
        description={key.description}
        title={key.title}
      />
    );
  });
  return (
    <Step.Group
      fluid
      vertical={props.vertical}
      stackable="tablet"
      ordered
      size={props.size}
    >
      {steps}
    </Step.Group>
  );
};

export default steps;
