import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./EnterDetailsForm.css";

const options = [
  { key: "ml", text: "Mild", value: "Mild" },
  { key: "md", text: "Medium", value: "Medium" },
  { key: "hi", text: "High", value: "High" },
];

class EnterDetailsForm extends Component {
  handleIntensityChange = (e, { value }) => {
    this.props.onAddReportIntensity(value);
  };

  handleDescriptionChange = (e, { value }) => {
    this.props.onAddReportDescription(value);
  };

  render() {
    return (
      <Form>
        <Form.Group widths={2}>
          <Form.Field required>
            <label>First Name</label>
            <Input value={this.props.user.fName} disabled />
          </Form.Field>
          <Form.Field required>
            <label>Last Name</label>
            <Input value={this.props.user.lName} disabled />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Field required>
            <label>Address</label>
            <Input value={this.props.user.address} disabled />
          </Form.Field>
          <Form.Field>
            <label>Phone</label>
            <Input placeholder="Phone Number" />
          </Form.Field>
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Field error={this.props.address === ""} required>
            <label>Report's Address</label>
            <Input value={this.props.address} disabled />
          </Form.Field>
          <Form.Field error={this.props.intensity === ""} required>
            <Form.Select
              required
              fluid
              label="Report's Intensity"
              options={options}
              placeholder="Select Intensity"
              onChange={this.handleIntensityChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.TextArea
          label="Report's Description"
          placeholder="Tell us more about the issue..."
          onChange={this.handleDescriptionChange}
        />
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    address: state.dyp.report.address,
    intensity: state.dyp.report.intensity,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddReportDescription: (description) =>
      dispatch(actions.addReportDescription(description)),
    onAddReportIntensity: (intensity) =>
      dispatch(actions.addReportIntensity(intensity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterDetailsForm);
