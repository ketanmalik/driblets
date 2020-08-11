import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Form,
  Input,
} from "semantic-ui-react";
import * as actions from "../../store/actions/index";
import Backdrop from "../UI/Backdrop/Backdrop";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import "./AuthUserModal.css";

const authUserModal = (props) => {
  return (
    <React.Fragment>
      <Backdrop
        show={props.showAuthUserModal}
        clicked={props.onCloseModalHandler}
      />
      <div className={`modal ${props.showAuthUserModal ? `open` : `close`}`}>
        <div className="modal-content">
          <Segment>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Header className="modal-content__header">Log In</Header>
                  <SignIn />
                </Grid.Column>
              </Grid.Row>
              <Divider className="modal-content__desktop-only" horizontal>
                Or
              </Divider>
              <Grid.Row className="modal-content__desktop-only">
                <Grid.Column>
                  <Header className="modal-content__header">Sign Up</Header>
                  <SignUp />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
        <div className="modal-footer"></div>
      </div>
    </React.Fragment>
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
