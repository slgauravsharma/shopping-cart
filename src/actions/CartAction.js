import * as CartActionTypes from "./CartActionTypes";

export const listCartAction = data => {
    return {
        type: CartActionTypes.ACTION_LIST_CART,
        data
    };   
};
export const addCartAction = data => {
  return {
    type: CartActionTypes.ACTION_ADD_CART,
    data
  };
};
export const updateCartPriceAction = data => {
  return { type: CartActionTypes.ACTION_UPDATE_CART_PRICE, data };
};
export const removeCartAction = data => {
  return { type: CartActionTypes.ACTION_REMOVE_CART, data };
};
