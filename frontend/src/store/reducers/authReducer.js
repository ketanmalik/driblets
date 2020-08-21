import * as actionTypes from "../actions/actionTypes";

const initialState = {
  dimmer: false,
  showAuthUserModal: false,
  showLogoutToast: false,
  signInResp: null,
  signUpResp: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_MODAL_HANDLER:
      return authUserModalHandler(state);
    case actionTypes.LOGOUT:
      return { ...state, user: null, showLogoutToast: true };
    case actionTypes.RESET_SIGN_IN_RESP:
      return { ...state, signInResp: null };
    case actionTypes.RESET_SIGN_UP_RESP:
      return { ...state, signUpResp: null };
    case actionTypes.SHOW_LOGOUT_TOAST:
      return { ...state, showLogoutToast: action.bool };
    case actionTypes.SIGN_IN_FAIL:
      return signInFailHandler(state, action.err);
    case actionTypes.SIGN_IN_START:
      return {
        ...state,
        dimmer: true,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return signInSuccesshandler(state, action.res);
    case actionTypes.SIGN_UP_FAIL:
      return signUpFailHandler(state, action.err);
    case actionTypes.SIGN_UP_START:
      return {
        ...state,
        dimmer: true,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return signUpSuccessHandler(state, action.res);
    case actionTypes.TEST_USER:
      return testUser(state);
    case actionTypes.UPDATE_REFRESHED_USER:
      return { ...state, user: action.res.data.refreshSession };
    default:
      return state;
  }
};

const authUserModalHandler = (state) => {
  return {
    ...state,
    showAuthUserModal: !state.showAuthUserModal,
    dimmer: false,
  };
};

const signInFailHandler = (state, err) => {
  let signInResp = { ...state.signInResp };
  signInResp["type"] = "error";
  signInResp["message"] = err.error;
  return {
    ...state,
    dimmer: false,
    signInResp: signInResp,
    user: null,
  };
};

const signInSuccesshandler = (state, res) => {
  let signInResp = { ...state.signInResp };
  let showAuthUserModal = { ...state.showAuthUserModal };
  let user = { ...state.user };
  if (res.errors) {
    signInResp["type"] = "error";
    signInResp["message"] = res.errors[0].message;
  } else {
    signInResp["type"] = "success";
    signInResp["message"] = {
      fName: res.data.login.fName,
      lName: res.data.login.lName,
    };
    showAuthUserModal = false;
    user = res.data.login;
  }
  return {
    ...state,
    signInResp: signInResp,
    dimmer: false,
    showAuthUserModal: showAuthUserModal,
    user: user,
  };
};

const signUpFailHandler = (state, err) => {
  let signUpResp = { ...state.signUpResp };
  signUpResp["type"] = "error";
  signUpResp["message"] = err.err;
  return {
    ...state,
    dimmer: false,
    signUpResp: signUpResp,
  };
};

const signUpSuccessHandler = (state, res) => {
  let signUpResp = { ...state.signUpResp };
  let showAuthUserModal = { ...state.showAuthUserModal };
  if (res.errors) {
    signUpResp["type"] = "error";
    signUpResp["message"] = res.errors[0].message;
  } else {
    signUpResp["type"] = "success";
    signUpResp["message"] = {
      fName: res.data.createUser.fName,
      lName: res.data.createUser.lName,
    };
    showAuthUserModal = false;
  }
  return {
    ...state,
    dimmer: false,
    signUpResp: signUpResp,
    showAuthUserModal: showAuthUserModal,
  };
};

const testUser = (state) => {
  return state;
};

export default authReducer;
