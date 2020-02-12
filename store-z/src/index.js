import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack'; //https://github.com/iamhosseindhv/notistack
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const THEME = createMuiTheme({ fontFamily: 'tahoma' });
const store = configStore();

function renderApp(app) {
  render(
    <MuiThemeProvider theme={THEME}>
      <AppContainer>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          action={[
            <Button color="inherit" size="small">
              {' '}
              {'Dismiss'}{' '}
            </Button>,
          ]}
        >
          {app}
        </SnackbarProvider>
      </AppContainer>
    </MuiThemeProvider>,
    document.getElementById('root'),
  );
}

renderApp(<Root store={store} routeConfig={routeConfig} />);

// Hot Module Replacement API
/* istanbul ignore if  */
if (module.hot) {
  module.hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
  module.hot.accept('./Root', () => {
    const nextRoot = require('./Root').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={routeConfig} />);
  });
}
