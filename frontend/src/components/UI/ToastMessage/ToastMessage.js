import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import "./ToastMessage.css";

class ToastMessage extends Component {
  componentDidMount() {
    setTimeout(() => this.props.close(), 3000);
  }

  render() {
    return (
      <Message
        negative={this.props.type === "negative"}
        positive={this.props.type === "positive"}
        className="message-wrapper"
      >
        <Message.Header>{this.props.title}</Message.Header>
        <p>{this.props.description}</p>
      </Message>
    );
  }
}

export default ToastMessage;
