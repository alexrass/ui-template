import queryString from 'query-string';

import { doGet } from 'modules/api';
import { Model } from 'models/common';

export class Auth extends Model({
  isLoggedIn: false,
  user: null,
}) {}

async function fetchAuth() {
  const json = await doGet('/1/auth');
  const auth = new Auth(json);
  return auth;
}

const API = {
  fetchAuth,
};

export default API;
