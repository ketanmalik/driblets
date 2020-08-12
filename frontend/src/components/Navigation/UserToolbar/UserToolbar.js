import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import AuthUserModal from "../../AuthUserModal/AuthUserModal";
import "./UserToolbar.css";

class UserToolbar extends Component {
  render() {
    return (
      <div className="user-toolbar">
        {this.props.showAuthUserModal && <AuthUserModal />}
        {/* <AuthUserModal /> */}
        <nav className="user-toolbar__item">
          <ul>
            <li>
              <Button
                basic
                className="sign-up__btn"
                onClick={this.props.onAuthUserHandler}
              >
                Sign up / Login
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showAuthUserModal: state.auth.showAuthUserModal,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthUserHandler: () => dispatch(actions.authUserModalHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserToolbar);
