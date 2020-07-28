import React, { Component } from "react";
import { Breadcrumb } from "semantic-ui-react";
import WebMap from "../UI/WebMap/WebMap";
import "./DoYourPart.css";

class DoYourPart extends Component {
  state = {
    currentActiveTab: "location",
  };

  render() {
    const sections = [
      {
        key: "findLocation",
        active: this.state.currentActiveTab === "location",
        content: "Find Location",
        link: false,
      },
      {
        key: "enterDetails",
        active: this.state.currentActiveTab === "details",
        content: "Enter Details",
        link: false,
      },
      {
        key: "confirmation",
        active: this.state.currentActiveTab === "confirmation",
        content: "Confirmation",
        link: false,
      },
    ];

    let currentDisplay = <WebMap />;

    if (this.state.currentActiveTab === "details") {
    }
    if (this.state.currentActiveTab === "confirmation") {
    }

    return (
      <div className="dyp-wrapper">
        <Breadcrumb icon="right angle" sections={sections} />
        {currentDisplay}
      </div>
    );
  }
}

export default DoYourPart;
