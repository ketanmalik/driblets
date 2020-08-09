import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import * as actions from "../../store/actions/index";
import Backdrop from "../UI/Backdrop/Backdrop";
import "./AuthUserModal.css";

const authUserModal = (props) => {
  return (
    // <div className="modal-wrapper" onClick={props.onCloseModalHandler}>
    <div>
      <Backdrop
        show={props.showAuthUserModal}
        clicked={props.onCloseModalHandler}
      />
      <div className="modal">
        <div className="modal-header">
          <h3 id="modal-header__login">Log In</h3>
          <p>
            New User?
            <Button
              basic
              className="modal-sign-up__btn"
              //   onClick={this.props.onAuthUserHandler}
            >
              <i>Create an account</i>
            </Button>
          </p>
        </div>
        <div className="modal-content">
          <Form>
            <Form.Group>
              <Form.Input
                label="First name"
                placeholder="First Name"
                width={6}
              />
              <Form.Input
                label="Middle Name"
                placeholder="Middle Name"
                width={4}
              />
              <Form.Input label="Last Name" placeholder="Last Name" width={6} />
            </Form.Group>
          </Form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showAuthUserModal: state.auth.showAuthUserModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModalHandler: () => dispatch(actions.authUserModalHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(authUserModal);
