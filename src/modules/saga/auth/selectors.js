import { Constants } from 'modules/saga/_common';
import { Code, Identifier } from './constants';

export function selectErrorCode(state) {
  return state
    .getIn([Identifier, Code]);
}

export function selectAuthState(state) {
  return state
    .getIn([Identifier, Constants.Data]);
}

export function selectLoading(state) {
  return state
    .getIn([Identifier, Constants.Loading]);
}

export function selectUser(state) {
  return state
    .getIn([Identifier, Constants.Data, 'user'], null);
}
