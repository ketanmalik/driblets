import * as actionTypes from "./actionTypes";
const bcrypt = require("bcryptjs");

export const authUserModalHandler = () => {
  return {
    type: actionTypes.AUTH_USER_MODAL_HANDLER,
  };
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
    const hashedPassword = await bcrypt.hash(payload.password, 12);

    let requestBody = {
      query: `
        query {
          login(email: "${payload.username}", password: "${payload.password}") {
            userId
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
          throw new Error("login failed");
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

    fetch("http://localhost:8080/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
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
