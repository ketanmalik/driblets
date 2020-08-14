import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  signInLoading: false,
  signInResp: null,
  signUpResp: null,
  showAuthUserModal: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_MODAL_HANDLER:
      return authUserModalHandler(state);
    case actionTypes.LOGOUT:
      return { ...state, user: null };
    case actionTypes.RESET_SIGN_IN_RESP:
      return { ...state, signInResp: null };
    case actionTypes.RESET_SIGN_UP_RESP:
      return { ...state, signUpResp: null };
    case actionTypes.SIGN_IN_FAIL:
      return signInFailHandler(state, action.err);
    case actionTypes.SIGN_IN_START:
      return { ...state, signInLoading: true };
    case actionTypes.SIGN_IN_SUCCESS:
      return signInSuccesshandler(state, action.res);
    case actionTypes.SIGN_UP_FAIL:
      return signUpFailHandler(state, action.err);
    case actionTypes.SIGN_UP_START:
      return { ...state, loading: true };
    case actionTypes.SIGN_UP_SUCCESS:
      return signUpSuccessHandler(state, action.res);
    default:
      return state;
  }
};

const authUserModalHandler = (state) => {
  return {
    ...state,
    showAuthUserModal: !state.showAuthUserModal,
    loading: false,
    signInLoading: false,
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
    console.log(res);
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
    signInLoading: false,
    showAuthUserModal: showAuthUserModal,
    user: user,
  };
};

const signInFailHandler = (state, err) => {
  let signInResp = { ...state.signInResp };
  signInResp["type"] = "error";
  signInResp["message"] = err.error;
  return { ...state, signInLoading: false, signInResp: signInResp, user: null };
};

const signUpFailHandler = (state, err) => {
  let signUpResp = { ...state.signUpResp };
  signUpResp["type"] = "error";
  signUpResp["message"] =
    "There's a network error. Please try again after some time.";
  return { ...state, loading: false, signUpResp: signUpResp };
};

const signUpSuccessHandler = (state, res) => {
  let signUpResp = { ...state.signUpResp };
  let showAuthUserModal = { ...state.showAuthUserModal };
  if (res.errors) {
    signUpResp["type"] = "error";
    signUpResp["message"] = res.errors[0].message;
  } else {
    console.log(res);
    signUpResp["type"] = "success";
    signUpResp["message"] = {
      fName: res.data.createUser.fName,
      lName: res.data.createUser.lName,
    };
    showAuthUserModal = false;
  }
  return {
    ...state,
    loading: false,
    signUpResp: signUpResp,
    showAuthUserModal: showAuthUserModal,
  };
};

export default authReducer;
