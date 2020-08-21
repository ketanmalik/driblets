import * as actionTypes from "../actions/actionTypes";

const initialState = {
  lastSubmittedReport: null,
  report: {
    address: "",
    date: "",
    description: "",
    id: "",
    intensity: "",
    status: "",
    trackingId: "",
    x_lon: "",
    y_lat: "",
  },
  reportError: false,
  showModal: false,
  startSubmit: false,
  submitSuccess: false,
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
    case actionTypes.DELETE_LAST_REPORT:
      return { ...state, lastSubmittedReport: null, submitSuccess: false };
    case actionTypes.RESET_REPORT:
      return resetReport(state);
    case actionTypes.RESET_REPORT_ERROR:
      return { ...state, reportError: false };
    case actionTypes.SHOW_MODAL_HANDLER:
      return { ...state, showModal: action.bool };
    case actionTypes.SUBMIT_REPORT_START:
      return { ...state, startSubmit: true, reportError: false };
    case actionTypes.SUBMIT_REPORT_END:
      return submitReportEnd(state, action.mode);
    case actionTypes.UPDATE_LAST_REPORT:
      return updateLastReport(state, action.report);
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
  return state;
};

const resetReport = (state) => {
  let report = { ...state.report };
  let { reportError, startSubmit } = { ...state };
  reportError = false;
  startSubmit = false;
  Object.keys(report).map((key) => (report[key] = ""));
  return {
    ...state,
    report: report,
    reportError: reportError,
    showModal: false,
    startSubmit: startSubmit,
  };
};

const submitReportEnd = (state, mode) => {
  let { reportError, submitSuccess } = { ...state };
  if (mode === "err") {
    reportError = true;
    submitSuccess = false;
  } else {
    reportError = false;
    submitSuccess = true;
  }

  return {
    ...state,
    startSubmit: false,
    reportError: reportError,
    submitSuccess,
    showModal: false,
  };
};

const updateLastReport = (state, report) => {
  let lastSubmittedReport = { ...state.lastSubmittedReport };
  lastSubmittedReport = report;
  return { ...state, lastSubmittedReport: lastSubmittedReport };
};

export default dypReducer;
