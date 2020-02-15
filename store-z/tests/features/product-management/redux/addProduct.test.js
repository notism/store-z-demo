import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN,
  PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS,
  PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE,
  PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR,
} from '../../../../src/features/product-management/redux/constants';

import {
  addProduct,
  dismissAddProductError,
  reducer,
} from '../../../../src/features/product-management/redux/addProduct';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('product-management/redux/addProduct', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addProduct succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addProduct())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS);
      });
  });

  it('dispatches failure action when addProduct fails', () => {
    const store = mockStore({});

    return store.dispatch(addProduct({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddProductError', () => {
    const expectedAction = {
      type: PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR,
    };
    expect(dismissAddProductError()).toEqual(expectedAction);
  });

  it('handles action type PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN correctly', () => {
    const prevState = { addProductPending: false };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_ADD_PRODUCT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addProductPending).toBe(true);
  });

  it('handles action type PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS correctly', () => {
    const prevState = { addProductPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_ADD_PRODUCT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addProductPending).toBe(false);
  });

  it('handles action type PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE correctly', () => {
    const prevState = { addProductPending: true };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_ADD_PRODUCT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addProductPending).toBe(false);
    expect(state.addProductError).toEqual(expect.anything());
  });

  it('handles action type PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR correctly', () => {
    const prevState = { addProductError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRODUCT_MANAGEMENT_ADD_PRODUCT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addProductError).toBe(null);
  });
});

