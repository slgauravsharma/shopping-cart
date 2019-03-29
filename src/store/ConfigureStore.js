import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import initialStoreState from "./InitialStoreState";

const initialState = initialStoreState;

const configureStore = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default configureStore;
