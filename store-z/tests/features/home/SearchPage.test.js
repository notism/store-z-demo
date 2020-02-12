import React from 'react';
import { shallow } from 'enzyme';
import { SearchPage } from '../../../src/features/home/SearchPage';

describe('home/SearchPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SearchPage {...props} />
    );

    expect(
      renderedComponent.find('.home-search-page').length
    ).toBe(1);
  });
});
