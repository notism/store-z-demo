import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/product-management/DefaultPage';

describe('product-management/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      productManagement: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.product-management-default-page').length
    ).toBe(1);
  });
});
