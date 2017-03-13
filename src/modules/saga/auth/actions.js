import { call, put } from 'redux-saga/effects';

import { ActionHelpers } from 'modules/saga/_common';

import { Identifier } from './constants';

export const STATUS_ERROR = ActionHelpers.forRequestError(Identifier, 'status');
export const STATUS_LOADED = ActionHelpers.forRequestDone(Identifier, 'status');
export const STATUS_REQUEST = ActionHelpers.forRequestStart(Identifier, 'status');

export const requestAuth = () => ({ type: STATUS_REQUEST });
