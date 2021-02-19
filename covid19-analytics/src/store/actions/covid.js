import API from "../Api";
import { covidType } from "../type/covid";
import { endLoading, startLoading } from "./loading";

export const getCovidDataRequest = () => {
  return { type: covidType.GET_COVID_DATA_REQUEST };
};

export const getCovidDataSuccess = (covidData) => {
  return { type: covidType.GET_COVID_DATA_SUCCESS, covidData };
};

export const getCovidDataFailed = (error) => {
  return { type: covidType.GET_COVID_DATA_FAILED, error };
};

export const startGetCovidData = (from, to, country) => {
  return (dispatch) => {
    dispatch(getCovidDataRequest());
    dispatch(startLoading());
    let url;
    country
      ? (url = `case?from=${from}&to=${to}&country=${country}`)
      : (url = `case?from=${from}&to=${to}`);
    console.log("Start calling ", url);

    API.get(url)
      .then((res) => {
        if (res.status === 200 && res.data !== null) {
          console.log("Response OK of ", url, ": ", res.data);
          dispatch(getCovidDataSuccess(res.data));
          dispatch(startGetCovidDataSummary());
        }
      })
      .catch((error) => {
        console.log("Response FAILED of ", url, ": ", error.response.data);
        dispatch(getCovidDataFailed(error.data));
        dispatch(endLoading());
      });
  };
};

export const getCovidDataSummarySuccess = (covidDataSummary) => {
  return { type: covidType.GET_COVID_DATA_SUMMARY_SUCCESS, covidDataSummary };
};

export const getCovidDataSummaryFailed = (error) => {
  return { type: covidType.GET_COVID_DATA_SUMMARY_FAILED, error };
};

export const startGetCovidDataSummary = () => {
  return (dispatch) => {
    let url = `case-summary`;
    console.log("Start calling ", url);

    API.get(url)
      .then((res) => {
        if (res.status === 200 && res.data !== null) {
          console.log("Response OK of ", url, ": ", res.data);
          dispatch(getCovidDataSummarySuccess(res.data));
          dispatch(endLoading());
        }
      })
      .catch((error) => {
        console.log("Response FAILED of ", url, ": ", error.response.data);
        dispatch(getCovidDataSummaryFailed(error.data));
        dispatch(endLoading());
      });
  };
};
