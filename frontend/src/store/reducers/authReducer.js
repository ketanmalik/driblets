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
  console.log("login success", res);
  let signInResp = { ...state.signInResp };
  if (res.errors) {
    signInResp["type"] = "error";
    signInResp["message"] = res.errors[0].message;
  } else {
    signInResp["type"] = "success";
    signInResp["message"] = {
      fName: res.data.login.fName,
      lName: res.data.login.lName,
    };
  }
  return { ...state, signInResp: signInResp, signInLoading: false, user: res };
};

const signInFailHandler = (state, err) => {
  console.log("login fail", err);
  let signInResp = { ...state.signInResp };
  signInResp["type"] = "error";
  signInResp["message"] = err.error;
  return { ...state, signInLoading: false, signInResp: signInResp, user: null };
};

const signUpFailHandler = (state, err) => {
  console.log("sign up fail", err);
  return { ...state, loading: false };
};

const signUpSuccessHandler = (state, res) => {
  console.log("sign up success", res);
  return { ...state, loading: false };
};

export default authReducer;
