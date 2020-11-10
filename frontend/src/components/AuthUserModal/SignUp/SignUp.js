import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Icon, Form, Input } from "semantic-ui-react";
import * as actions from "../../../store/actions/index";
import ToastMessage from "../../UI/ToastMessage/ToastMessage";

class SignUp extends Component {
  state = {
    checkboxText: "Show Password",
    errors: {
      fName: false,
      lName: false,
      username: false,
      password: false,
      address: false,
    },
    formError: false,
    formFields: {
      fName: null,
      lName: null,
      username: null,
      password: null,
      address: null,
    },
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

  passwordCheckboxHandler = (e, data) => {
    let { checkboxText, hidePassword } = { ...this.state };
    if (data.checked) {
      checkboxText = "Hide Password";
      hidePassword = false;
    } else {
      checkboxText = "Show Password";
      hidePassword = true;
    }
    this.setState({ checkboxText: checkboxText, hidePassword: hidePassword });
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
      <Form onSubmit={this.signUpFormSubmithandler} error>
        {this.state.formError && (
          <ToastMessage
            close={this.closeToastHandler}
            type="negative"
            title="Error"
            description="Please fill all the mandatory fileds correctly."
          />
        )}
        {this.props.signUpResp && this.props.signUpResp.type === "error" && (
          <ToastMessage
            close={this.props.onCloseToastHandler}
            type="negative"
            title="Could not sign up"
            description={this.props.signUpResp.message}
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
        <Form.Group widths={2}>
          <Form.Field></Form.Field>
          <Form.Field>
            <Checkbox
              onClick={this.passwordCheckboxHandler}
              toggle
              label={this.state.checkboxText}
            />
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
        <div className="modal-content__btns">
          <Button className="modal-content__btn go-back" onClick={this.props.goBackHandler}>
            Go Back
          </Button>
          <Button type="submit" className="modal-content__btn sign-up">
            Sign Up
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signUpResp: state.auth.signUpResp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (payload) => dispatch(actions.signUpHandler(payload)),
    onCloseToastHandler: () => dispatch(actions.resetSignUpRespHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
