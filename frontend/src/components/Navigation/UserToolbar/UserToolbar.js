import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import AuthUserModal from "../../AuthUserModal/AuthUserModal";
import ToastMessage from "../../UI/ToastMessage/ToastMessage";
import "./UserToolbar.css";

class UserToolbar extends Component {
  componentDidMount() {
    this.props.onRefreshSession();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user === null && this.props.user !== null) {
      this.intervalID = setInterval(() => {
        this.props.onRefreshSession();
      }, 20000);
    }
    if (prevProps.user !== null && this.props.user === null) {
      clearInterval(this.intervalID);
    }
  }
  render() {
    return (
      <div className="user-toolbar">
        {this.props.signUpResp && this.props.signUpResp.type === "success" && (
          <ToastMessage
            close={this.props.onSignUpCloseToastHandler}
            type="positive"
            title={`Hello ${this.props.signUpResp.message.fName}`}
            description={`Welcome to Driblets! Let's save some water today! `}
          />
        )}
        {this.props.showLogoutToast && (
          <ToastMessage
            close={this.props.onCloseLogoutToast}
            type="positive"
            title={`You have been successfully logged out`}
          />
        )}
        {this.props.trackError && (
          <ToastMessage
            close={this.props.onResetTrackIdError}
            description="Please ensure you've entered a correct tracking id and try again"
            title="Invalid Tracking ID"
            type="negative"
          />
        )}

        {this.props.user ? (
          <React.Fragment>
            {this.props.signInResp &&
              this.props.signInResp.type === "success" && (
                <ToastMessage
                  close={this.props.onCloseToastHandler}
                  type="positive"
                  title={`Hello ${this.props.signInResp.message.fName}`}
                  description={`Welcome back to Driblets! Let's save some water today! `}
                />
              )}

            <nav className="user-toolbar__item">
              <ul>
                {/* <li>
                  <Button
                    basic
                    className="user-toolbar__btn"
                    // onClick={this.props.onAuthUserHandler}
                  >
                    {this.props.user.fName}
                  </Button>
                </li> */}
                <li>
                  <Button
                    basic
                    className="user-toolbar__btn"
                    onClick={this.props.onLogout}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </nav>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.props.showAuthUserModal && <AuthUserModal />}
            <nav className="user-toolbar__item">
              <ul>
                <li>
                  <Button
                    basic
                    className="user-toolbar__btn"
                    onClick={this.props.onAuthUserHandler}
                  >
                    Sign up / Login
                  </Button>
                </li>
              </ul>
            </nav>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLogoutToast: state.auth.showLogoutToast,
    signInResp: state.auth.signInResp,
    signUpResp: state.auth.signUpResp,
    showAuthUserModal: state.auth.showAuthUserModal,
    trackError: state.track.error,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthUserHandler: () => dispatch(actions.authUserModalHandler()),
    onCloseToastHandler: () => dispatch(actions.resetSignInRespHandler()),
    onLogout: () => dispatch(actions.logout()),
    onRefreshSession: () => dispatch(actions.refreshSessionHandler()),
    onResetTrackIdError: () => dispatch(actions.resetTrackIdError()),
    onCloseLogoutToast: () => dispatch(actions.showLogoutToast(false)),
    onSignUpCloseToastHandler: () => dispatch(actions.resetSignUpRespHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserToolbar);
