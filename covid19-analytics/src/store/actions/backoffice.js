import API from "../Api";
import {endLoading, startLoading} from "./loading";
import {covidType} from "../type/covid";

export const postNewWeeklyReportRequest = () => {
    return { type: covidType.POST_NEW_WEEKLY_REPORT_REQUEST };
};

export const postNewWeeklyReportSuccess = () => {
    return { type: covidType.POST_NEW_WEEKLY_REPORT_SUCCESS };
};

export const postNewWeeklyReportFailed = (error) => {
    return { type: covidType.POST_NEW_WEEKLY_REPORT_FAILED, error };
};

export const startPostNewWeeklyReport = (body) => {
    return (dispatch) => {
        dispatch(postNewWeeklyReportRequest());
        dispatch(startLoading());
        const url = `case`;
        console.log("Start calling ", url);

        API.post(url, JSON.stringify(body)).then((res) => {
            if (res.status === 201) {
                console.log('Response OK of ', url);
                dispatch(postNewWeeklyReportSuccess());
                dispatch(endLoading());
            }
        }).catch((error) => {
            console.log('Response FAILED of ', url, ': ', error.response.data);
            dispatch(postNewWeeklyReportFailed(error.data));
            dispatch(endLoading());
        });
    };
};
