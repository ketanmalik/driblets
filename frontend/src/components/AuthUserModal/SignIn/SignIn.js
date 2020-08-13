import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import * as actions from "../../../store/actions/index";
import ToastMessage from "../../UI/ToastMessage/ToastMessage";
import "./SignIn.css";

class SignIn extends Component {
  state = {
    formFields: { username: null, password: null },
    errors: { username: false, password: false },
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
      errors[type] = false;
      formFields[type] = value;
    }

    this.setState({ errors: errors, formFields: formFields });
  };

  signInFormHandler = () => {
    let { formFields, formError, errors } = { ...this.state };
    formError = false;
    for (const key in formFields) {
      if (formFields[key] === null) {
        formError = true;
        errors[key] = true;
      }
    }
    this.setState({ formError: formError, errors: errors }, () => {
      if (!formError) {
        this.props.onSignIn(this.state.formFields);
      }
    });
  };

  render() {
    return (
      <Form
        onSubmit={this.signInFormHandler}
        error
        loading={this.props.signInLoading}
      >
        {this.state.formError && (
          <ToastMessage
            close={this.closeToastHandler}
            type="negative"
            title="Error"
            description="Please fill all the mandatory fileds correctly."
          />
        )}
        <Form.Field error={this.state.errors.username} required>
          <label>Username</label>
          <Input
            iconPosition="left"
            placeholder="Email"
            onChange={(event, data) =>
              this.inputChangeHandler(data, "username")
            }
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
            placeholder="Password"
            type={this.state.hidePassword ? "password" : "text"}
          >
            <Icon name="key" />
            <input />
          </Input>
        </Form.Field>
        <Button type="submit" className="modal-content__btn">
          Log In
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signInLoading: state.auth.signInLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (payload) => dispatch(actions.signInHandler(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
