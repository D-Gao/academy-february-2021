import {covidType} from "../type/covid";
import {restMethod} from "../../assets/utils/constant";

let defaultState = {
    loading: false,
    action: null,
    error: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case covidType.POST_NEW_WEEKLY_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                action: restMethod.post
            };
        case covidType.POST_NEW_WEEKLY_REPORT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case covidType.POST_NEW_WEEKLY_REPORT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
