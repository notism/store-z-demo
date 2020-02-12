import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../../src/features/dashboard/DashboardPage';

describe('dashboard/DashboardPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      dashboard: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardPage {...props} />
    );

    expect(
      renderedComponent.find('.dashboard-dashboard-page').length
    ).toBe(1);
  });
});
