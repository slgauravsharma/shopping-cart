import * as productActionTypes from "../actions/productActionTypes";
import initialStoreState from "../store/initialStoreState";

const productReducer = (state = initialStoreState.products, action) => {
  switch (action.type) {
    case productActionTypes.ACTION_LIST_PRODUCT:
      return action.data;
    case productActionTypes.ACTION_UPDATE_PRODUCT_LIST:
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
