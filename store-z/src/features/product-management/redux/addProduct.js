import {
  PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN,
  PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS,
  PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE,
  PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR,
} from './constants';
import { POST00 } from '../../../helper/api';
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function addProduct(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN,
    });

   let data = args.data;
    return new Promise((resolve, reject) => {
      POST00(1, `Products/`, data).then(
        res => {
          const data = res.data;
          dispatch({
            type: PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS,
            data: data,
          });

          resolve(data);
        },
        err => {
          dispatch({
            type: PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE,
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
export function dismissAddProductError() {
  return {
    type: PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addProductPending: true,
        addProductError: null,
      };

    case PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS:
      // The request is success
      return {
        ...state,
        addProductPending: false,
        addProductError: null,
      };

    case PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE:
      // The request is failed
      return {
        ...state,
        addProductPending: false,
        addProductError: action.data.error,
      };

    case PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addProductError: null,
      };

    default:
      return state;
  }
}
