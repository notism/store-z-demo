import React from 'react';
import { shallow } from 'enzyme';
import { ButtonUpdate } from '../../../src/features/product-management';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonUpdate />);
  expect(renderedComponent.find('.product-management-button-update').length).toBe(1);
});
