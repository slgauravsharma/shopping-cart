import * as cartActionTypes from "../actions/cartActionTypes";
import initialStoreState from "../store/initialStoreState";

const cartReducer = (state = initialStoreState.carts, action) => {
  switch (action.type) {
    case cartActionTypes.ACTION_LIST_CART:
      return action.data;
    case cartActionTypes.ACTION_ADD_CART:
      return [...state, action.data];
    case cartActionTypes.ACTION_UPDATE_CART_PRICE:
      return state.map(cart => {
        if (cart.id === action.data.id) {
          return action.data;
        } else {
          return cart;
        }
      });
    case cartActionTypes.ACTION_REMOVE_CART:
      return state.filter(cart => cart.id !== action.data.id);
    default:
      return state;
  }
};

export default cartReducer;
