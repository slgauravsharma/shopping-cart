import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  carts: cartReducer
});

export default rootReducer;
