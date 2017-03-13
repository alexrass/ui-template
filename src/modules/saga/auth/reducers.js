import * as Actions from './actions';
import * as AuthConstants from './constants';
import { Constants } from 'modules/saga/_common';

const initialState = Immutable.Map({
  [ AuthConstants.Code ]: 200,
  [ Constants.Data ]: null,
  [ Constants.Error ]: false,
  [ Constants.Loading ]: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Actions.STATUS_REQUEST:
      return state.set(Constants.Loading, true);
    case Actions.STATUS_LOADED:
      return state
        .set(Constants.Data, action.payload)
        .set(Constants.Error, false)
        .set(Constants.Loading, false);
    case Actions.STATUS_ERROR:
      return state
        .set(AuthConstants.Code, action.payload)
        .set(Constants.Error, true)
        .set(Constants.Loading, false);
    default:
      return state;
  }
}
