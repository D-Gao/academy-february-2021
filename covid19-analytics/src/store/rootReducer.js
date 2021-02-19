import {combineReducers} from "redux";
import authReducer from "./reducers/auth";
import covidReducer from "./reducers/covid";
import countriesReducer from "./reducers/countries";
import loadingReducer from "./reducers/loading"

const appReducer = combineReducers({ authReducer, covidReducer, countriesReducer, loadingReducer });

const rootReducer = (state, action) => {
  if (action.type === "LOGGED_OUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
