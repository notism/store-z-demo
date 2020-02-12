import React from 'react';
import { shallow } from 'enzyme';
import { ButtonEdit } from '../../../src/features/product-management';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonEdit />);
  expect(renderedComponent.find('.product-management-button-edit').length).toBe(1);
});
