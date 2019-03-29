import * as ProductActionTypes from "./ProductActionTypes";

export const listProductAction = data => {
    return {
        type: ProductActionTypes.ACTION_LIST_PRODUCT,
        data
    };   
};

export const updateProductListAction = data => {
    return { type: ProductActionTypes.ACTION_UPDATE_PRODUCT_LIST, data };
};

