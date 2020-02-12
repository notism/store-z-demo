import React from 'react';
import { shallow } from 'enzyme';
import { ProductTable } from '../../../src/features/product-management';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ProductTable />);
  expect(renderedComponent.find('.product-management-product-table').length).toBe(1);
});
