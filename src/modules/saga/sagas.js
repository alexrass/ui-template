import authSaga from './auth/sagas';

export default function* mainSaga() {
  yield [
    authSaga(),
  ];
}
