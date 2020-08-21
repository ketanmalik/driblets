import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as qs from "qs";

export const addReport = (report) => {
  return async (dispatch) => {
    dispatch(submitReportStartHandler());
    report.date = new Date();
    report.status = "Report Submitted";

    let payload = {
      client_id: "8mtvSSH8nqS00zhf",
      client_secret: "bee8b95d682840ff95d7a14d84a9ad3a",
      grant_type: "client_credentials",
    };

    let url =
      "https://www.arcgis.com/sharing/rest/oauth2/token?client_id=8mtvSSH8nqS00zhf&client_secret=bee8b95d682840ff95d7a14d84a9ad3a&grant_type=client_credentials";

    axios({
      url: url,
      method: "POST",
      data: payload,
    })
      .then((resp) => resp.data.access_token)
      .then((respData) => {
        payload = {
          f: "json",
          token: respData,
          adds: `[
            {
              "geometry" : {
                "x": ${report.x_lon},
                "y": ${report.y_lat},
                "spatialReference": {
                  "wkid": 4326
                }
              },
              "attributes" : {
                "Name" : "${report.address}",
                "Intensity" : "${report.intensity}"
              }
            }
          ]`,
        };

        url =
          "https://services5.arcgis.com/PJBXFilHiiwW6bPy/arcgis/rest/services/new_report/FeatureServer/0/applyEdits";

        axios({
          method: "POST",
          url: url,
          data: qs.stringify(payload),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
          .then((res) => {
            if (res.data && res.data.error) {
              throw { err: res.data.error };
            }
            return dispatch(
              submitReportToDb(report, res.data.addResults[0], respData)
            );
          })
          .catch((error) => {
            return dispatch(submitReportEndHandler("err"));
          });
      })
      .catch((err) => {
        return dispatch(submitReportEndHandler("err"));
      });
  };
};

export const addReportAddress = (address) => {
  return {
    type: actionTypes.ADD_REPORT_ADDRESS,
    address: address,
  };
};

export const addReportDescription = (description) => {
  return {
    type: actionTypes.ADD_REPORT_DESCRIPTION,
    description: description,
  };
};

export const addReportIntensity = (intensity) => {
  return {
    type: actionTypes.ADD_REPORT_INTENSITY,
    intensity: intensity,
  };
};

export const deleteLastReport = () => {
  return {
    type: actionTypes.DELETE_LAST_REPORT,
  };
};

export const deleteLastSubmittedReport = (id, token) => {
  return async (dispatch) => {
    let payload = {
      f: "json",
      token: token,
      deletes: `[${id}]`,
    };

    let url =
      "https://services5.arcgis.com/PJBXFilHiiwW6bPy/arcgis/rest/services/new_report/FeatureServer/0/applyEdits";

    axios({
      method: "POST",
      url: url,
      data: qs.stringify(payload),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then((res) => dispatch(deleteLastReport()))
      .catch((err) => console.log("err: ", err));
  };
};

export const resetReport = () => {
  return { type: actionTypes.RESET_REPORT };
};

export const resetReportError = () => {
  return {
    type: actionTypes.RESET_REPORT_ERROR,
  };
};

export const showModalHandler = (bool) => {
  return {
    type: actionTypes.SHOW_MODAL_HANDLER,
    bool: bool,
  };
};

export const submitReportStartHandler = () => {
  return {
    type: actionTypes.SUBMIT_REPORT_START,
  };
};

export const submitReportEndHandler = (mode = "no_err") => {
  return { type: actionTypes.SUBMIT_REPORT_END, mode: mode };
};

export const submitReportToDb = (report, resp, token) => {
  return async (dispatch) => {
    let date = report.date.toDateString();
    let objectId = resp.objectId.toString();
    let trackingId = resp.globalId + resp.objectId;

    let requestBody = {
      query: `
        mutation {
          addReport(report:{
            address: "${report.address}"
            date: "${date}"
            description:"${report.description}"
            intensity:"${report.intensity}"
            objectId:"${objectId}"
            status:"${report.status}"
            trackingId:"${trackingId}"
          }) {
            _id
            address
            creator{
              _id
              address
              email
              fName
              lName
            }
            date
            description
            intensity
            objectId
            status
            trackingId
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
        dispatch(updateLastSubmittedReport(resData.data.addReport));
        return dispatch(submitReportEndHandler());
      })
      .catch((err) => {
        dispatch(deleteLastSubmittedReport(resp.objectId, token));
        return dispatch(submitReportEndHandler("err"));
      });
  };
};

export const updateLastSubmittedReport = (report) => {
  return {
    type: actionTypes.UPDATE_LAST_REPORT,
    report: report,
  };
};
