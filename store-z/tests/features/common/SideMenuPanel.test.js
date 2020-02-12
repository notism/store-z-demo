import React from 'react';
import { shallow } from 'enzyme';
import { SideMenuPanel } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SideMenuPanel />);
  expect(renderedComponent.find('.common-side-menu-panel').length).toBe(1);
});
