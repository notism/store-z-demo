import {
  PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN,
  PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS,
  PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE,
  PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR,
} from './constants';
import { GET00 } from '../../../helper/api';
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getProduct(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN,
    });

   return new Promise((resolve, reject) => {
      GET00(1, `Products/`, args).then(
        res => {
          const data = res.data;
          dispatch({
            type: PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS,
            data: data,
          });

          resolve(data);
        },
        err => {
          dispatch({
            type: PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetProductError() {
  return {
    type: PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getProductPending: true,
        getProductError: null,
      };

    case PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS:
      // The request is success
      const productList = [];

      let data2 = action.data.reverse().map(datalist => {        
        let data = {
          id: datalist.id,
          productName: datalist.productName,
          Description: datalist.description,         
          type: datalist.type,
          price: datalist.price,
          Status: datalist.status.description,          
        };
        productList.push(data);
      });
      return {
        ...state,
        product:productList,
        getProductPending: false,
        getProductError: null,
      };

    case PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE:
      // The request is failed
      return {
        ...state,
        getProductPending: false,
        getProductError: action.data.error,
      };

    case PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getProductError: null,
      };

    default:
      return state;
  }
}
