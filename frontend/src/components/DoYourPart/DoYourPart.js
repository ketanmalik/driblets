import React, { Component } from "react";
import {
  Button,
  Divider,
  Dimmer,
  Icon,
  Header,
  Loader,
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
    showErrToastMsg: false,
    toastDescription: "",
    toastTitle: "",
  };

  addReportHandler = async () => {
    this.props.onAddReport(this.props.report);
  };

  closeModal = () => {
    this.props.onShowModalHandler(false);
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
    this.props.onShowModalHandler(true);
  };

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

    if (this.props.submitSuccess) {
      this.props.history.push("/");
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
        {this.props.reportError && (
          <ToastMessage
            type="negative"
            title="Network Error"
            description="Your request could not be processed. Please try again later."
            close={this.props.onResetReportError}
          />
        )}
        <Modal
          open={this.props.openModal}
          onClose={this.closeModal}
          size="small"
        >
          <Dimmer active={this.props.loading}>
            <Loader />
          </Dimmer>
          <Modal.Header>Submit Incident Report?</Modal.Header>
          <Modal.Content>
            Are you sure you want to submit a water leakage incident report at{" "}
            {this.props.report.address}?
          </Modal.Content>
          <Modal.Actions>
            <Button
              className="modal-close-btn"
              negative
              onClick={this.closeModal}
            >
              No
            </Button>
            <Button
              className="modal-positive-btn"
              positive
              onClick={this.addReportHandler}
            >
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
    loading: state.dyp.startSubmit,
    openModal: state.dyp.showModal,
    report: state.dyp.report,
    reportError: state.dyp.reportError,
    submitSuccess: state.dyp.submitSuccess,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddReport: (report) => dispatch(actions.addReport(report)),
    onResetReport: () => dispatch(actions.resetReport()),
    onResetReportError: () => dispatch(actions.resetReportError()),
    onShowModalHandler: (bool) => dispatch(actions.showModalHandler(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoYourPart);
