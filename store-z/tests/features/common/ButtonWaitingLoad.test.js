import React from 'react';
import { shallow } from 'enzyme';
import { ButtonWaitingLoad } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ButtonWaitingLoad />);
  expect(renderedComponent.find('.common-button-waiting-load').length).toBe(1);
});
