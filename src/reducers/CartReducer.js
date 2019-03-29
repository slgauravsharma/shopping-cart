import * as CartActionTypes from "../actions/CartActionTypes";
import initialStoreState from "../store/InitialStoreState";

const cartReducer = (state = initialStoreState.carts, action) => {
  switch (action.type) {
    case CartActionTypes.ACTION_LIST_CART:
    return action.data
    case CartActionTypes.ACTION_ADD_CART:
      return [...state, action.data];
    case CartActionTypes.ACTION_UPDATE_CART_PRICE:
      return state.map(cart => {
        if (cart.id === action.data.id) {
          return action.data;
        } else {
          return cart;
        }
      });
    case CartActionTypes.ACTION_REMOVE_CART:
      return state.filter(cart => cart.id !== action.data.id);
    default:
      return state;
  }
};

export default cartReducer;
