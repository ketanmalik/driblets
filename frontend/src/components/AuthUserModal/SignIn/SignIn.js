import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Icon, Form, Input } from "semantic-ui-react";
import * as actions from "../../../store/actions/index";
import ToastMessage from "../../UI/ToastMessage/ToastMessage";

class SignIn extends Component {
  state = {
    checkboxText: "Show Password",
    errors: { username: false, password: false },
    formError: false,
    formFields: { username: null, password: null },
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
      <Form onSubmit={this.signInFormHandler} error>
        {this.state.formError && (
          <ToastMessage
            close={this.closeToastHandler}
            type="negative"
            title="Error"
            description="Please fill all the mandatory fileds correctly."
          />
        )}
        {this.props.signInResp && this.props.signInResp.type === "error" && (
          <ToastMessage
            close={this.props.onCloseToastHandler}
            type="negative"
            title="Could not log in"
            description="The username or the password you entered doesn't match any account"
          />
        )}
        <Form.Field error={this.state.errors.username} required>
          <label>Username</label>
          <p style={{ color: "grey" }}>
            (use <i>test@test.com</i> for demo purposes)
          </p>
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
          <p style={{ color: "grey" }}>
            (use <i>driblets</i> for demo purposes)
          </p>
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
        <Form.Field>
          <Checkbox
            onClick={this.passwordCheckboxHandler}
            toggle
            label={this.state.checkboxText}
          />
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
    dimmer: state.auth.dimmer,
    signInResp: state.auth.signInResp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseToastHandler: () => dispatch(actions.resetSignInRespHandler()),
    onSignIn: (payload) => dispatch(actions.signInHandler(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
