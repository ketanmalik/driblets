import React from "react";
import { Step } from "semantic-ui-react";

const singleStep = (props) => {
  return (
    <Step completed={props.completed} active={props.active}>
      <Step.Content>
        <Step.Title>{props.title}</Step.Title>
        <Step.Description>{props.description}</Step.Description>
      </Step.Content>
    </Step>
  );
};

export default singleStep;
