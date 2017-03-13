import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducers from 'modules/saga/reducers';
import rootSaga from 'modules/saga/sagas';

let configuredStore = null;

const configureStore = (history) => {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers(reducers);
  const enhancer = compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  configuredStore = createStore(rootReducer, enhancer);

  let rootSagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(['modules/saga/reducers'], () => {
      const nextReducers = require('modules/saga/reducers');
      configuredStore.replaceReducer(combineReducers(nextReducers));
    });

    module.hot.accept(['modules/saga/sagas'], () => {
      if (!!rootSagaTask) {
        rootSagaTask.cancel();
      }

      const nextSagas = require('modules/saga/sagas');
      rootSagaTask = sagaMiddleware.run(nextSagas);
    });
  }
};

export default function getStore(history) {
  if (!!configuredStore) {
    return configuredStore;
  } else {
    configureStore(history);
    return getStore();
  }
};
