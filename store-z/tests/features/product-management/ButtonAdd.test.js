import React from 'react';
import { shallow } from 'enzyme';
import { ButtonAdd } from '../../../src/features/product-management';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonAdd />);
  expect(renderedComponent.find('.product-management-button-add').length).toBe(1);
});
