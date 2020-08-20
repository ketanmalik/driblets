import React, { Component } from "react";
import {
  Button,
  Divider,
  Icon,
  Header,
  Message,
  Modal,
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Btn from "../UI/Button/Btn";
import EnterDetailsForm from "./EnterDetailsForm/EnterDetailsForm";
import WebMap from "../UI/WebMap/WebMap";
import ToastMessage from "../UI/ToastMessage/ToastMessage";
import "./DoYourPart.css";

class DoYourPart extends Component {
  state = {
    openModal: false,
    showErrToastMsg: false,
    toastDescription: "",
    toastTitle: "",
  };

  addReportHandler = async () => {
    this.props.onAddReport(this.props.report);
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  componentWillUnmount = () => {
    this.props.onResetReport();
  };

  dypCloseErrToasthandler = () => {
    this.setState({ showErrToastMsg: false });
  };

  dypContinueBtnHandler = () => {
    if (this.props.report.address === "") {
      this.setState({
        showErrToastMsg: true,
        toastTitle: "Address Not Found",
        toastDescription:
          "Please select an address in the map to continue with your report.",
      });
      return;
    }
    if (this.props.report.intensity === "") {
      this.setState({
        showErrToastMsg: true,
        toastTitle: "Intensity Not Found",
        toastDescription:
          "Please select the intensity of the incident to continue with your report.",
      });
      return;
    }
    this.setState({ openModal: true });
  };

  dypDetailsHandler = () => {};

  render() {
    let currentDisplay = (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h3" className="dyp-wrapper__header">
            <Icon name="location arrow" />
            Find Location
          </Header>
        </Divider>
        <WebMap />
        <Divider horizontal>
          <Header as="h3" className="dyp-wrapper__header">
            <Icon name="clipboard outline" />
            Enter Details
          </Header>
        </Divider>
        <EnterDetailsForm continueBtnClicked={this.dypContinueBtnHandler} />
        <Btn
          clicked={this.dypContinueBtnHandler}
          type="primary"
          text="Report Incident"
          width="15rem"
          margin="2rem 0 4rem 0"
        />
      </React.Fragment>
    );

    if (!this.props.user) {
      currentDisplay = (
        <Message info>
          <Message.Header>You are currently not logged in</Message.Header>
          <p>
            We're sorry but this feature is avalaible only to registered users.
          </p>
          <p>Please sign up / login to report a water wastage incident.</p>
        </Message>
      );
    }

    return (
      <div className="dyp-wrapper">
        {currentDisplay}
        {this.state.showErrToastMsg && (
          <ToastMessage
            type="negative"
            title={this.state.toastTitle}
            description={this.state.toastDescription}
            close={this.dypCloseErrToasthandler}
          />
        )}
        <Modal
          open={this.state.openModal}
          onClose={this.closeModal}
          size="small"
        >
          <Modal.Header>Submit Incident Report?</Modal.Header>
          <Modal.Content>
            Are you sure you want to submit a water leakage incident report at{" "}
            {this.props.report.address}?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.closeModal}>
              No
            </Button>
            <Button positive onClick={this.addReportHandler}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    report: state.dyp.report,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddReport: (report) => dispatch(actions.addReport(report)),
    onResetReport: () => dispatch(actions.resetReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoYourPart);
