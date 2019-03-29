import * as ProductActionTypes from "../actions/ProductActionTypes";
import initialStoreState from "../store/InitialStoreState";

const productReducer = (state = initialStoreState.products, action) => {
  switch (action.type) {
    case ProductActionTypes.ACTION_LIST_PRODUCT:
    return action.data
    case ProductActionTypes.ACTION_UPDATE_PRODUCT_LIST:
      return state.map(product => {
        if (product.id === action.data.id) {
          return action.data;
        } else {
          return product;
        }
      });
    default:
      return state;
  }
};

export default productReducer;
