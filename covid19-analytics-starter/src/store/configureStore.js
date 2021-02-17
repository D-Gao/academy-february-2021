import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
export default configureStore();
