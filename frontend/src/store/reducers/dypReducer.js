import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

const initialState = {
  report: {
    address: "",
    date: "",
    description: "",
    id: "",
    intensity: "",
    status: "",
  },
};

const dypReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REPORT:
      return addReportReducer(state, action.report);
    default:
      return state;
  }
};

const addReportReducer = (state, report) => {
  console.log("add report reducer");
  return state;
};

export default dypReducer;
