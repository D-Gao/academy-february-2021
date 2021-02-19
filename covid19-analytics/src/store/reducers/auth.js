import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from "../actions/auth";

let defaultstate = {
  state: "LOGGED_OUT",
  isUserAuthenticated: false,
  wrong_credential: null,
  auth: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultstate, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        auth: action.auth,
        state: "LOGGED_IN",
        loading: false,
        isUserAuthenticated: true,
        wrong_credential: false,
      };
    case LOGGED_OUT:
      return {
        auth: {},
        state: "LOGGED_OUT",
        loading: false,
        isUserAuthenticated: false,
        wrong_credential: null,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        state: "LOGGING",
        loading: true,
        wrong_credential: null,
        isUserAuthenticated: false,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        state: "LOGGING_OUT",
        loading: true,
        wrong_credential: null,
        isUserAuthenticated: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        state: "LOGIN_ERROR",
        wrong_credential: true,
        loading: false,
      };
    default:
      return state;
  }
};
