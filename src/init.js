import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './modules/store';
import Router from 'routers';
import { Identifier as RoutingIdentifier } from 'modules/saga/routing/constants';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const MOUNT_NODE = document.getElementById('react-root');

const store = configureStore(browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get(RoutingIdentifier).toJS()
});

const renderComponent = (component) => {
  ReactDOM.render(
    component,
    MOUNT_NODE
  );
};

const render = () => {
  try {
    if (DEVELOPMENT) {
      renderComponent(<AppContainer><Router store={ store } history={ history } /></AppContainer>);
    } else {
      renderComponent(<Router store={ store } history={ history } />);
    }
  } catch (error) {
    if (DEVELOPMENT) {
      console.error(error);
      renderComponent(<RedBox error={error} />);
    }
  }
};

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
