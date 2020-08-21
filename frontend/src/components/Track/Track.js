import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input, Message } from "semantic-ui-react";
import * as actions from "../../store/actions/index";
import "./Track.css";

class Track extends Component {
  componentDidMount() {
    this.props.onResetTrackReport();
  }
  render() {
    return (
      <div className="track-wrapper">
        <Message className="track-message-wrapper" info>
          <Message.Header>Track Your Report</Message.Header>
          <p>
            We are putting our constant efforts to resolve the issues raised by
            you.
          </p>
          <p>
            Please wait for 2 business days after submitting your report to get
            the most recent status of your report.
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.track.error,
    loading: state.track.loading,
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
