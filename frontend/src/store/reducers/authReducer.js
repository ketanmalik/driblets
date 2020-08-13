import * as actionTypes from "../actions/actionTypes";

const initialState = {
  showAuthUserModal: true,
  user: null,
  signInLoading: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_MODAL_HANDLER:
      return authUserModalHandler(state);
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
  console.log("success", res);
  return { ...state, signInLoading: false, user: res };
};

const signInFailHandler = (state, err) => {
  console.log("fail", err);
  return { ...state, signInLoading: false, user: null };
};

const signUpFailHandler = (state, err) => {
  console.log("fail", err);
  return { ...state, loading: false };
};

const signUpSuccessHandler = (state, res) => {
  console.log("success", res);
  return { ...state, loading: false };
};

export default authReducer;
