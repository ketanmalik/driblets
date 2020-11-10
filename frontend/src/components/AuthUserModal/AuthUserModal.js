import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dimmer,
  Grid,
  Header,
  Loader,
  Segment,
} from "semantic-ui-react";
import * as actions from "../../store/actions/index";
import Backdrop from "../UI/Backdrop/Backdrop";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import "./AuthUserModal.css";

class AuthUserModal extends Component {
  state = {
    showSignUpForm: false,
  };

  backdropClickHandler = () => {
    this.setState({ showSignUpForm: false }, this.props.onCloseModalHandler);
  };

  showSignUpFormHandler = () => {
    this.setState({ showSignUpForm: true });
  };

  render() {
    return (
      <React.Fragment>
        <Backdrop
          show={this.props.showAuthUserModal}
          clicked={this.backdropClickHandler}
        />
        <div className="modal">
          <div className="modal-content">
            <Segment>
              <Dimmer active={this.props.dimmer} inverted>
                <Loader />
              </Dimmer>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Header className="modal-content__header">
                      {this.state.showSignUpForm ? "Sign Up" : "Log In"}
                    </Header>
                    {this.state.showSignUpForm ? (
                      <SignUp goBackHandler={() => this.setState({ showSignUpForm: false })} />
                    ) : (
                        <React.Fragment>
                          <div className="modal-content__mobile-only">
                            New User?
                          <Button
                              className="mobile-only-btn"
                              onClick={this.showSignUpFormHandler}
                            >
                              <i>Create an account</i>
                            </Button>
                          </div>
                          <SignIn />
                        </React.Fragment>
                      )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
          <div className="modal-footer"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dimmer: state.auth.dimmer,
    showAuthUserModal: state.auth.showAuthUserModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseModalHandler: () => dispatch(actions.authUserModalHandler()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthUserModal);
