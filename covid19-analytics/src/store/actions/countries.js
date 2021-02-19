import API from "../Api";
import {countriesType} from "../type/countries";
import {endLoading, startLoading} from "./loading";

export const getCountriesRequest = () => {
    return { type: countriesType.GET_COUNTRIES_REQUEST };
};

export const getCountriesSuccess = (countries) => {
    return { type: countriesType.GET_COUNTRIES_SUCCESS, countries };
};

export const getCountriesFailed = (error) => {
    return { type: countriesType.GET_COUNTRIES_FAILED, error };
};

export const startGetCountries = () => {
    return (dispatch) => {
        dispatch(getCountriesRequest());
        dispatch(startLoading());
        const url = `countries`;
        console.log("Start calling ", url);

        return API.get(url).then((res) => {
            if (res.status === 200 && res.data !== null) {
                console.log('Response OK of ', url, ': ', res.data);
                dispatch(getCountriesSuccess(res.data));
            }
            dispatch(endLoading());
        }).catch((error) => {
            console.log('Response FAILED of ', url, ': ', error.response.data);
            dispatch(getCountriesFailed(error.data));
            dispatch(endLoading());
        });
    };
};
