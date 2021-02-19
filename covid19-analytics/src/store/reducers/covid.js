import {covidType} from "../type/covid";
import {restMethod} from "../../assets/utils/constant";


let defaultState = {
    loading: false,
    action: null,
    covidData: [],
    covidDataSummary: [],
    error: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case covidType.GET_COVID_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                action: restMethod.get
            };
        case covidType.GET_COVID_DATA_SUMMARY_SUCCESS:
            return {
                ...state,
                loading: false,
                covidDataSummary: action.covidDataSummary
            };
        case covidType.GET_COVID_DATA_SUCCESS:
            return {
                ...state,
                covidData: action.covidData
            };
        case covidType.GET_COVID_DATA_SUMMARY_FAILED:
        case covidType.GET_COVID_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
