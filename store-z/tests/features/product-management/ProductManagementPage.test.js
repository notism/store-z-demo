import React from 'react';
import { shallow } from 'enzyme';
import { ProductManagementPage } from '../../../src/features/product-management/ProductManagementPage';

describe('product-management/ProductManagementPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      productManagement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ProductManagementPage {...props} />
    );

    expect(
      renderedComponent.find('.product-management-product-management-page').length
    ).toBe(1);
  });
});
