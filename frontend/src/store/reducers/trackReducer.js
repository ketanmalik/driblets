import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: false,
  loading: false,
  report: null,
  searchTerm: "",
};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_TRACK_ID_ERROR:
      return { ...state, error: false };
    case actionTypes.RESET_TRACK_REPORT:
      return resetTrackReport(state);
    case actionTypes.TRACK_REPORT_FAIL:
      return { ...state, error: true, loading: false };
    case actionTypes.TRACK_REPORT_SUCCESS:
      return { ...state, error: false, loading: false, report: action.report };
    case actionTypes.TRACK_SEARCH_BAR_LOADING:
      return { ...state, loading: true };
    case actionTypes.UPDATE_TRACK_SEARCH_TERM:
      return updateSearchTermHandler(state, action.term);
    default:
      return state;
  }
};

const resetTrackReport = (state) => {
  return {
    ...state,
    error: false,
    loading: false,
    report: null,
    searchTerm: "",
  };
};

const updateSearchTermHandler = (state, term) => {
  let searchTerm = { ...state.searchTerm };
  searchTerm = term;
  return { ...state, searchTerm: searchTerm };
};

export default trackReducer;
