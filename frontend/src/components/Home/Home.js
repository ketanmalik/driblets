import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import * as actions from "../../store/actions/index";
import Btn from "../UI/Button/Btn";
import HowWeWork from "./HowWeWork/HowWeWork";
import Jumbotron from "../UI/Jumbotron/Jumbotron";
import OpenIssues from "./OpenIssues/OpenIssues";
import Statistics from "./Statistics/Statistics";
import "./Home.css";

class Home extends Component {
  dypBtnHandler = () => {
    this.props.history.push("doyourpart");
  };
  render() {
    console.log(this.props.lastReport);
    return (
      <div className="home-wrapper">
        {this.props.lastReport && (
          <Modal open onClose={this.props.onCloseModal} size="small">
            <Modal.Header>Report Received</Modal.Header>
            <Modal.Content>
              <h3>Thank You for your efforts!</h3>
              <p>
                We really appreciate your gesture and our team will look into
                the incident reported by you!
              </p>
              <p>
                Please take a note of the details of your report for future
                reference:
                <ul>
                  <li>
                    <b>Tracking ID: </b>
                    {this.props.lastReport.trackingId}
                  </li>
                  <li>
                    <b>Address: </b>
                    {this.props.lastReport.address}
                  </li>
                  <li>
                    <b>Date: </b>
                    {this.props.lastReport.date}
                  </li>
                  <li>
                    <b>Intensity: </b>
                    {this.props.lastReport.intensity}
                  </li>
                  <li>
                    <b>Status: </b>
                    {this.props.lastReport.status}
                  </li>
                  <li>
                    <b>Reported By: </b>
                    {this.props.lastReport.creator.fName}&nbsp;
                    {this.props.lastReport.creator.lName}
                  </li>
                </ul>
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                className="modal-close-btn"
                negative
                onClick={this.props.onCloseModal}
              >
                Close
              </Button>
            </Modal.Actions>
          </Modal>
        )}
        <Jumbotron>
          <div className="jumbotron-content">
            <h1>#everydropmatters!</h1>
            <h3>
              <i>Thousands have lived without love, not one without water.</i>
            </h3>
            <p>
              We're putting our constant efforts to combat water wastage and
              water scarcity. Your contribution matters!
            </p>
            <Btn
              clicked={this.dypBtnHandler}
              type="primary"
              text="Do your part"
              width="15rem"
            />
          </div>
        </Jumbotron>
        <HowWeWork />
        <OpenIssues />
        <Statistics />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lastReport: state.dyp.lastSubmittedReport,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModal: () => dispatch(actions.deleteLastReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
