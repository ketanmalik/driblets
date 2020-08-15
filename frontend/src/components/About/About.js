import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import * as actions from "../../store/actions/index";

const about = (props) => {
  return (
    <div>
      <h1>About</h1>
      <Button primary onClick={() => props.onTestUser(props.user.token)}>
        Test Users
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTestUser: (token) => dispatch(actions.testUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(about);
