import React from "react";
import { Image, Reveal } from "semantic-ui-react";
import "./Card.css";

const Card = (props) => (
  <div className="card-wrapper">
    <Reveal animated="move up">
      <Reveal.Content visible>
        <Image src={props.img} size="medium" />
      </Reveal.Content>
      <Reveal.Content hidden>{props.content}</Reveal.Content>
    </Reveal>
  </div>
);

export default Card;
