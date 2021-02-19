import {countriesType} from "../type/countries";
import {restMethod} from "../../assets/utils/constant";

let defaultState = {
    loading: false,
    action: null,
    countries: [],
    error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    switch (action.type) {
        case countriesType.GET_COUNTRIES_REQUEST:
            return {
                ...state,
                loading: true,
                action: restMethod.get
            };
        case countriesType.GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.countries
            };
        case countriesType.GET_COUNTRIES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
