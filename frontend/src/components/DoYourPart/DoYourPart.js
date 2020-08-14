import React, { Component } from "react";
import { Breadcrumb, Message } from "semantic-ui-react";
import { connect } from "react-redux";
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

    let currentDisplay = (
      <React.Fragment>
        <Breadcrumb icon="right angle" sections={sections} />
        <WebMap />
      </React.Fragment>
    );

    if (!this.props.user) {
      currentDisplay = (
        <Message info>
          <Message.Header>You are currently logged in.</Message.Header>
          <p>
            We're sorry but this feature is avalaible only to registered users
          </p>
          <p>Please sign up / login to report a water wastage incident</p>
        </Message>
      );
    }

    if (this.state.currentActiveTab === "details") {
    }

    if (this.state.currentActiveTab === "confirmation") {
    }

    return <div className="dyp-wrapper">{currentDisplay}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoYourPart);
