import * as actionTypes from "./actionTypes";

export const resetTrackIdError = () => {
  return {
    type: actionTypes.RESET_TRACK_ID_ERROR,
  };
};

export const resetTrackReport = () => {
  return {
    type: actionTypes.RESET_TRACK_REPORT,
  };
};

export const trackReport = (id) => {
  return async (dispatch) => {
    dispatch(trackSearchBarLoading());
    if (id.trim() === "" || id === null) {
      return dispatch(trackReportFail());
    }
    let requestBody = {
      query: `
            query {
                track(trackingId:"${id}") {
                    address
                    creator{
                        address
                        email
                        fName
                        lName
                    }
                    date
                    description
                    intensity
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
          throw { eror: res.statusText };
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          return dispatch(trackReportFail());
        }
        console.log(resData.data.track);
        return dispatch(trackReportSuccess(resData.data.track));
      })
      .catch((err) => {
        return dispatch(trackReportFail());
      });
  };
};

export const trackReportFail = () => {
  return {
    type: actionTypes.TRACK_REPORT_FAIL,
  };
};

export const trackReportSuccess = (report) => {
  return {
    type: actionTypes.TRACK_REPORT_SUCCESS,
    report: report,
  };
};

export const trackSearchBarLoading = () => {
  return {
    type: actionTypes.TRACK_SEARCH_BAR_LOADING,
  };
};

export const updateTrackSearchTerm = (term) => {
  return {
    type: actionTypes.UPDATE_TRACK_SEARCH_TERM,
    term: term,
  };
};
