import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import * as actions from "../../../store/actions/index";
import ToastMessage from "../../UI/ToastMessage/ToastMessage";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    formFields: {
      fName: null,
      lName: null,
      username: null,
      password: null,
      address: null,
    },
    errors: {
      fName: false,
      lName: false,
      username: false,
      password: false,
      address: false,
    },
    formError: false,
    hidePassword: true,
  };

  closeToastHandler = () => {
    this.setState({ formError: false });
  };

  inputChangeHandler = (data, type) => {
    const { value } = data;
    let { errors, formFields } = { ...this.state };
    if (value.trim() === "") {
      errors[type] = true;
      formFields[type] = null;
    } else {
      if (type === "username" && this.invalidEmail(value)) {
        errors[type] = true;
        formFields[type] = null;
      } else if (type === "password" && this.invalidPassword(value)) {
        errors[type] = true;
        formFields[type] = null;
      } else {
        errors[type] = false;
        formFields[type] = value;
      }
    }
    this.setState({ errors: errors, formFields: formFields });
  };

  invalidEmail = (email) => {
    var reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !reg.test(email);
  };

  invalidPassword = (password) => {
    return !(password.length >= 6 && password.length <= 12);
  };

  signUpFormSubmithandler = () => {
    let { formFields, formError, errors } = this.state;
    formError = false;
    for (const key in formFields) {
      if (formFields[key] === null) {
        formError = true;
        errors[key] = true;
      }
    }
    this.setState({ formError: formError, errors: errors }, () => {
      if (!formError) {
        this.props.onSignUp(this.state.formFields);
      }
    });
  };

  render() {
    return (
      <Form
        onSubmit={this.signUpFormSubmithandler}
        error
        loading={this.props.loading}
      >
        {this.state.formError && (
          <ToastMessage
            close={this.closeToastHandler}
            type="negative"
            title="Error"
            description="Please fill all the mandatory fileds correctly."
          />
        )}

        <Form.Group widths="equal">
          <Form.Field error={this.state.errors.fName} required>
            <label>First Name</label>
            <Input
              onChange={(event, data) => this.inputChangeHandler(data, "fName")}
              placeholder="First Name"
            />
          </Form.Field>
          <Form.Field error={this.state.errors.lName} required>
            <label>Last Name</label>
            <Input
              onChange={(event, data) => this.inputChangeHandler(data, "lName")}
              placeholder="Last Name"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field error={this.state.errors.username} required>
            <label>Username</label>
            <Input
              onChange={(event, data) =>
                this.inputChangeHandler(data, "username")
              }
              iconPosition="left"
              placeholder="Email"
            >
              <Icon name="at" />
              <input />
            </Input>
          </Form.Field>
          <Form.Field error={this.state.errors.password} required>
            <label>Password</label>
            <Input
              onChange={(event, data) =>
                this.inputChangeHandler(data, "password")
              }
              iconPosition="left"
              placeholder="6-12 characters long"
              type={this.state.hidePassword ? "password" : "text"}
            >
              <Icon name="key" />
              <input />
            </Input>
          </Form.Field>
        </Form.Group>
        <Form.Field error={this.state.errors.address} required>
          <label>Address</label>
          <Input
            onChange={(event, data) => this.inputChangeHandler(data, "address")}
            iconPosition="left"
            placeholder="Address"
          >
            <Icon name="home" />
            <input />
          </Input>
        </Form.Field>
        <Button type="submit" className="modal-content__btn">
          Sign Up
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (payload) => dispatch(actions.signUpHandler(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
