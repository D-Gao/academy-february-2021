import {loadingType} from "../type/loading";

let defaultState = {
    counter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case loadingType.START_LOADING:
            return {
                ...state,
                counter: state.counter + 1
            };
        case loadingType.END_LOADING:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
};
