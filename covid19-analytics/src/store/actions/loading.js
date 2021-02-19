import {loadingType} from "../type/loading";

export const startLoading = () => {
    return { type: loadingType.START_LOADING };
};

export const endLoading = () => {
    return { type: loadingType.END_LOADING };
};