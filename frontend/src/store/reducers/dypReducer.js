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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REPORT:
      addReportReducer(state, action.report);
    default:
      return state;
  }
};

const addReportReducer = (state, report) => {
  return state;
};

export default reducer;
