import * as actionTypes from "./actionTypes";
const bcrypt = require("bcryptjs");

export const authUserModalHandler = () => {
  return {
    type: actionTypes.AUTH_USER_MODAL_HANDLER,
  };
};

export const logout = () => {
  return async (dispatch) => {
    let requestBody = {
      query: `
        query {
          logout
        }
      `,
    };

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status !== 200 && res.data !== 201) {
          throw { error: "unsuccessful logout" };
        }
        return res.json();
      })
      .then((resData) => {
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutSuccess = () => {
  return { type: actionTypes.LOGOUT };
};

export const refreshSessionHandler = () => {
  return async (dispatch) => {
    const requestBody = {
      query: `
        query {
          refreshSession {
            userId
            fName
            lName
            token
            tokenExpiration
            refreshToken
          }
        }
      `,
    };

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status !== 200 && res.data !== 201) {
          throw { error: "session expired" };
        }
        return res.json();
      })
      .then((resData) => {
        dispatch(updateRefreshedUser(resData));
      })
      .catch((err) => {
        console.log("refresh failed: ", err);
      });
  };
};

export const resetSignInRespHandler = () => {
  return { type: actionTypes.RESET_SIGN_IN_RESP };
};

export const resetSignUpRespHandler = () => {
  return { type: actionTypes.RESET_SIGN_UP_RESP };
};

export const signInFailHandler = (err) => {
  return {
    type: actionTypes.SIGN_IN_FAIL,
    err: err,
  };
};

export const signInHandler = (payload) => {
  return async (dispatch) => {
    dispatch(signInStartHandler());

    let requestBody = {
      query: `
        query {
          login(email: "${payload.username}", password: "${payload.password}") {
            userId
            fName
            lName
            token
            tokenExpiration
            refreshToken
          }
        }
      `,
    };

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw { error: res.statusText };
        }
        return res.json();
      })
      .then((resData) => {
        return dispatch(signInSuccessHandler(resData));
      })
      .catch((err) => {
        return dispatch(signInFailHandler(err));
      });
  };
};

export const signInStartHandler = () => {
  return { type: actionTypes.SIGN_IN_START };
};

export const signInSuccessHandler = (res) => {
  return { type: actionTypes.SIGN_IN_SUCCESS, res: res };
};

export const signUpFailHandler = (err) => {
  return {
    type: actionTypes.SIGN_UP_FAIL,
    err: err,
  };
};

export const signUpHandler = (payload) => {
  return async (dispatch) => {
    dispatch(signUpStartHandler());
    const hashedPassword = await bcrypt.hash(payload.password, 12);

    let requestBody = {
      query: `
        mutation {
          createUser(userInput: {
            address:"${payload.address}", 
            email:"${payload.username}",
            fName:"${payload.fName}",
            lName:"${payload.lName}",
            password:"${hashedPassword}"
          }) {
            _id
            address
            email
            fName
            lName
            password
          }
        }
      `,
    };

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw { error: res.statusText };
        }
        return res.json();
      })
      .then((resData) => {
        return dispatch(signUpSuccessHandler(resData));
      })
      .catch((err) => {
        return dispatch(signUpFailHandler(err));
      });
  };
};

export const signUpStartHandler = () => {
  return { type: actionTypes.SIGN_UP_START };
};

export const signUpSuccessHandler = (res) => {
  return { type: actionTypes.SIGN_UP_SUCCESS, res: res };
};

export const testUser = (token) => {
  return async (dispatch) => {
    const requestBody = {
      query: `
        query {
          users {
            _id
            address
            email
            fName
            lName
          }
        }
      `,
    };

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.data !== 201) {
          throw { error: "session expired" };
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });

    return { type: actionTypes.TEST_USER };
  };
};

export const updateRefreshedUser = (res) => {
  return { type: actionTypes.UPDATE_REFRESHED_USER, res: res };
};
