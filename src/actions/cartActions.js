import * as cartActionTypes from "./cartActionTypes";

export const listCartAction = data => {
  return {
    type: cartActionTypes.ACTION_LIST_CART,
    data
  };
};

export const addCartAction = data => {
  return {
    type: cartActionTypes.ACTION_ADD_CART,
    data
  };
};

export const updateCartPriceAction = data => {
  return { type: cartActionTypes.ACTION_UPDATE_CART_PRICE, data };
};

export const removeCartAction = data => {
  return { type: cartActionTypes.ACTION_REMOVE_CART, data };
};
