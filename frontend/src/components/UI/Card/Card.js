import React from "react";
import { Card, Image } from "semantic-ui-react";

const CardExampleCard = (props) => (
  <Card>
    <Image src={props.img} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.header}</Card.Header>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
  </Card>
);

export default CardExampleCard;
