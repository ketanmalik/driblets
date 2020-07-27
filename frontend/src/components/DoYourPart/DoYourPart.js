import React, { Component } from "react";
import { Label, Menu, Tab } from "semantic-ui-react";
import WebMap from "../UI/WebMap/WebMap";
import "./DoYourPart.css";

class DoYourPart extends Component {
  state = {
    activeIndex: 0,
    disableConfirmationTab: false,
    disableEnterDetailsTab: true,
  };

  render() {
    const panes = [
      {
        menuItem: <Menu.Item>Find Location</Menu.Item>,
        pane: {
          key: "tab1",
          content: "This tab has center-aligned text",
          size: "massive",
        },
      },
      {
        menuItem: (
          <Menu.Item disabled={this.state.disableEnterDetailsTab}>
            Enter Details
          </Menu.Item>
        ),
        pane: {
          key: "tab2",
          content: "This tab has center-aligned text",
          textAlign: "center",
        },
      },
      {
        menuItem: (
          <Menu.Item disabled={this.state.disableConfirmationTab}>
            Confirmation
          </Menu.Item>
        ),
        pane: {
          key: "tab3",
          content: (
            <div>
              This tab contains a <Label>JSX</Label> element
            </div>
          ),
        },
      },
    ];
    return (
      <div className="dyp-wrapper">
        <Tab
          // activeIndex={this.state.activeIndex}
          className="dyp-tabs"
          panes={panes}
          renderActiveOnly={false}
        />
      </div>
    );
  }
}

export default DoYourPart;
