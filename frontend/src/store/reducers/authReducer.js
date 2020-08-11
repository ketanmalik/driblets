import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const initialState = {
  showAuthUserModal: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_MODAL_HANDLER:
      return authUserModalHandler(state);
    default:
      return state;
  }
};

const authUserModalHandler = (state) => {
  return { state, showAuthUserModal: !state.showAuthUserModal };
};

export default authReducer;
