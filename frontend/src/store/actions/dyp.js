import * as actionTypes from "./actionTypes";

export const addReport = (report) => {
  return {
    type: actionTypes.ADD_REPORT,
    report: report,
  };
};
