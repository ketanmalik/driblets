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
    x_lon: "",
    y_lat: "",
  },
};

const dypReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REPORT:
      return addReportReducer(state);
    case actionTypes.ADD_REPORT_ADDRESS:
      return addReportAddress(state, action.address);
    case actionTypes.ADD_REPORT_DESCRIPTION:
      return addReportDescription(state, action.description);
    case actionTypes.ADD_REPORT_INTENSITY:
      return addReportIntensity(state, action.intensity);
    case actionTypes.RESET_REPORT:
      return resetReport(state);
    default:
      return state;
  }
};

const addReportAddress = (state, address) => {
  let report = { ...state.report };
  report.address = address.address;
  report.x_lon = address.x_lon;
  report.y_lat = address.y_lat;
  return { ...state, report: report };
};

const addReportDescription = (state, description) => {
  let report = { ...state.report };
  report.description = description;
  return { ...state, report: report };
};

const addReportIntensity = (state, intensity) => {
  let report = { ...state.report };
  report.intensity = intensity;
  return { ...state, report: report };
};

const addReportReducer = (state) => {
  console.log("redd");
  return state;
};

const resetReport = (state) => {
  let report = { ...state.report };
  Object.keys(report).map((key) => (report[key] = ""));
  return { ...state, report: report };
};

export default dypReducer;
