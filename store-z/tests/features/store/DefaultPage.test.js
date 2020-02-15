import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/store/DefaultPage';

describe('store/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      store: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.store-default-page').length
    ).toBe(1);
  });
});
