export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

export function loggedIn(auth = {}) {
  return { type: LOGGED_IN, auth };
}

export function loggedOut() {
  return { type: LOGGED_OUT };
}

export function requestLogin() {
  return { type: LOGIN_REQUEST };
}

export function loginError() {
  return { type: LOGIN_ERROR };
}

export function requestLogout() {
  return { type: LOGOUT_REQUEST };
}

export const startLogin = (username, password) => {
  console.log("startLogin with ", username, password);
  return (dispatch) => {
    dispatch(requestLogin());
    return new Promise((resolve, reject) => {
    const user = { username: "admin", password: "password" };
    setTimeout(() => {
      if(username === "admin" && password === "password")
        resolve(user);
        else
        reject({response: {status: 400}});
    }, 3000);
  })
    .then((response) => {
      console.log("Response login ", response);
      dispatch(loggedIn(response));
    })
    .catch((error) => {
      console.log(error, error.response.status);
      dispatch(loginError());
      dispatch(loggedOut());
    })
};
}

/**
 * Logout action call
 */
export function startLogout() {
  return (dispatch) => {
    console.log("logging out");
    dispatch(requestLogout());
    dispatch(loggedOut());
  };
}
