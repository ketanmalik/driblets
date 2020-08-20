import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as qs from "qs";

export const addReport = (report) => {
  return async (dispatch) => {
    report.date = new Date();
    report.status = "Report Submitted";

    let payload = {
      client_id: "8mtvSSH8nqS00zhf",
      client_secret: "bee8b95d682840ff95d7a14d84a9ad3a",
      grant_type: "client_credentials",
    };

    axios({
      url:
        "https://www.arcgis.com/sharing/rest/oauth2/token?client_id=8mtvSSH8nqS00zhf&client_secret=bee8b95d682840ff95d7a14d84a9ad3a&grant_type=client_credentials",
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
                "Name" : "My Point",
                "Intensity" : "Mild"
              }
            }
          ]`,
        };

        let url =
          "https://services5.arcgis.com/PJBXFilHiiwW6bPy/arcgis/rest/services/new_report/FeatureServer/0/applyEdits";

        let config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        axios({
          method: "POST",
          url: url,
          data: qs.stringify(payload),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
          .then((res) => console.log("final res:", res))
          .catch((err) => console.log("err: ", err));
      });

    return {
      type: actionTypes.ADD_REPORT,
    };
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

export const resetReport = () => {
  return { type: actionTypes.RESET_REPORT };
};
