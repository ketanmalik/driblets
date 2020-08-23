import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Grid,
  Input,
  Message,
  Progress,
  Segment,
} from "semantic-ui-react";
import * as actions from "../../store/actions/index";
import Steps from "../UI/Steps/Steps";
import "./Track.css";

class Track extends Component {
  state = {
    size: "small",
    vertical: false,
  };
  componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler.bind(this));

    this.props.onResetTrackReport();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler.bind(this));
  }
  resizeHandler = () => {
    if (window.innerWidth >= 1561) {
      this.setState({ size: "small", vertical: false });
    } else if (window.innerWidth >= 1535 && window.innerWidth <= 1560) {
      this.setState({ size: "tiny", vertical: false });
    } else {
      this.setState({ size: "small", vertical: true });
    }
  };

  render() {
    let data = [];
    let percent = null;
    if (this.props.report) {
      switch (this.props.report.status) {
        case "Report Submitted":
          percent = 25;
          break;
        case "Under Evaluation":
          percent = 50;
          break;
        case "Work In Progress":
          percent = 75;
          break;
        case "Final Evaluation":
          percent = 100;
          break;
        default:
          percent = 100;
          break;
      }
      data = [
        {
          completed: percent >= 25,
          description: "Your report has been received by us",
          title: "Report Submitted",
        },
        {
          completed: percent >= 50,
          description: "We're evaluating the issue reported by you",
          title: "Under Evaluation",
        },
        {
          completed: percent >= 75,
          description:
            "Concerned department is working to get the issue resolved",
          title: "Work In Progress",
        },
        {
          completed: percent === 100,
          description: "We're conducting final evaluation on the issue",
          title: "Final Evaluation",
        },
      ];
    }

    return (
      <div className="track-wrapper">
        <Message className="track-message-wrapper" info>
          <Message.Header>Track Your Report</Message.Header>
          <p>
            We are putting our constant efforts to resolve the issues raised by
            you.
          </p>
          <p>Demo Tracking IDs:</p>
          <p>
            1. 968DE388-CAA8-4033-994F-C0D37F07F81B69 <br />
            2. B1ACE777-BACC-4F65-AC64-993F6366863864 <br />
            3. 3165DFE9-BD4C-49C4-9405-C7F5D28E469666 <br />
            4. 36193AF3-5262-478A-9344-E9AD189C523E68 <br />
            5. DCFB7B89-4959-45E9-946B-088A39CC726180 <br />
          </p>
        </Message>
        <Input
          className="track-input"
          error={this.props.error}
          icon="search"
          placeholder="Tracking ID..."
          onChange={(e, data) => this.props.onUpdateSearchTerm(data.value)}
          loading={this.props.loading}
          value={this.props.term}
        />
        <Button
          className="track-input__btn"
          disabled={this.props.loading}
          onClick={() => this.props.onTrackReport(this.props.term)}
        >
          Get Status
        </Button>
        {this.props.report && (
          <Segment placeholder raised className="track-segment">
            {this.props.report.status === "Issue Resolved" && (
              <Message positive className="track-message-wrapper">
                <Message.Header>Issue Resolved</Message.Header>
                <p>This issue has been closed from our side.</p>
              </Message>
            )}
            <p>
              <b>Tracking ID: </b>
              {this.props.report.trackingId}
            </p>
            <Steps
              data={data}
              size={this.state.size}
              vertical={this.state.vertical}
            />
            <Progress percent={percent} progress indicating />
            <Divider />

            <Grid columns={2}>
              <Grid.Column className="tracking-details">
                <h3>Incident Details</h3>
                <Divider />
                <div>
                  <p>
                    <b>Address: </b>
                    {this.props.report.address}
                  </p>
                  <p>
                    <b>Date: </b>
                    {this.props.report.date}
                  </p>
                  <p>
                    <b>Intensity: </b>
                    {this.props.report.intensity}
                  </p>
                  {this.props.report.description !== "" && (
                    <p>
                      <b>Description: </b>
                      {this.props.report.description}
                    </p>
                  )}
                </div>
              </Grid.Column>
              <Grid.Column className="tracking-details">
                <h3>Complainant Details</h3>
                <Divider />
                <div>
                  <p>
                    <b>First Name: </b>
                    {this.props.report.creator.fName}
                  </p>
                  <p>
                    <b>Last Name: </b>
                    {this.props.report.creator.lName}
                  </p>
                  <p>
                    <b>Email: </b>
                    {this.props.report.creator.email}
                  </p>
                </div>
              </Grid.Column>
            </Grid>
          </Segment>
        )}
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.track.error,
    loading: state.track.loading,
    report: state.track.report,
    term: state.track.searchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetTrackReport: () => dispatch(actions.resetTrackReport()),
    onTrackReport: (id) => dispatch(actions.trackReport(id)),
    onUpdateSearchTerm: (term) => dispatch(actions.updateTrackSearchTerm(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
