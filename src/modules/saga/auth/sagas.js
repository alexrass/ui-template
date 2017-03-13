import { call, put, takeLatest } from 'redux-saga/effects';
import { throttle } from 'redux-saga';

import * as Actions from './actions';
import AuthApi from 'models/auth';

export function* authCheck(error) {
  if (error) {
    switch (error.code) {
      case 401:
      case 403:
        yield put({ type: Actions.STATUS_ERROR, payload: error.code });
    }
  }
}

export default function* sagas() {
  yield takeLatest(Actions.STATUS_REQUEST, getAuth);
}

function* getAuth() {
  try {
    const auth = yield call(AuthApi.fetchAuth);
    yield put({ type: Actions.STATUS_LOADED, payload: auth });
  } catch (err) {
    console.error('Caught error in getAuth()', err);
    yield authCheck(err);
    yield put({ type: Actions.STATUS_ERROR, payload: err });
  }
}
