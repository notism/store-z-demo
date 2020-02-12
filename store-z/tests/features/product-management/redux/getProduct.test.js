import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN,
  PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS,
  PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE,
  PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR,
} from '../../../../src/features/product-management/redux/constants';

import {
  getProduct,
  dismissGetProductError,
  reducer,
} from '../../../../src/features/product-management/redux/getProduct';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('product-management/redux/getProduct', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getProduct succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getProduct())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS);
      });
  });

  it('dispatches failure action when getProduct fails', () => {
    const store = mockStore({});

    return store.dispatch(getProduct({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetProductError', () => {
    const expectedAction = {
      type: PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR,
    };
    expect(dismissGetProductError()).toEqual(expectedAction);
  });

  it('handles action type PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN correctly', () => {
    const prevState = { getProductPending: false };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_GET_PRODUCT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getProductPending).toBe(true);
  });

  it('handles action type PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS correctly', () => {
    const prevState = { getProductPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_GET_PRODUCT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getProductPending).toBe(false);
  });

  it('handles action type PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE correctly', () => {
    const prevState = { getProductPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_GET_PRODUCT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getProductPending).toBe(false);
    expect(state.getProductError).toEqual(expect.anything());
  });

  it('handles action type PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR correctly', () => {
    const prevState = { getProductError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_GET_PRODUCT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getProductError).toBe(null);
  });
});

