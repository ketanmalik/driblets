import * as actionTypes from "./actionTypes";
const bcrypt = require("bcryptjs");

export const authUserModalHandler = () => {
  return {
    type: actionTypes.AUTH_USER_MODAL_HANDLER,
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
          }
        }
      `,
    };

    fetch("http://localhost:8080/graphql", {
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
  console.log("1. sign-up handler");
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

    fetch("http://localhost:8080/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("2. sign-up then 1");
        if (res.status !== 200 && res.status !== 201) {
          throw { error: res.statusText };
        }
        return res.json();
      })
      .then((resData) => {
        console.log("3. sign-up then 2");
        return dispatch(signUpSuccessHandler(resData));
      })
      .catch((err) => {
        console.log("4. sign-up error");
        return dispatch(signUpFailHandler(err));
      });
  };
};

export const signUpStartHandler = () => {
  return { type: actionTypes.SIGN_UP_START };
};

export const signUpSuccessHandler = (res) => {
  console.log("1. sign up success handler");
  return { type: actionTypes.SIGN_UP_SUCCESS, res: res };
};
