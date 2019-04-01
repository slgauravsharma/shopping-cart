import * as productActionTypes from "./productActionTypes";

export const listProductAction = data => {
  return {
    type: productActionTypes.ACTION_LIST_PRODUCT,
    data
  };
};

export const updateProductListAction = data => {
  return { type: productActionTypes.ACTION_UPDATE_PRODUCT_LIST, data };
};
