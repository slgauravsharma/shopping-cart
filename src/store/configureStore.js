import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from "redux";
import initialStoreState from "./initialStoreState";

const initialState = initialStoreState;

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(/* loggerMiddleware, */);
}

const configureStore = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares, thunk))
)

export default configureStore;