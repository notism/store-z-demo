import React from 'react';
import { shallow } from 'enzyme';
import { ButtonSearch } from '../../../src/features/product-management';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonSearch />);
  expect(renderedComponent.find('.product-management-button-search').length).toBe(1);
});
