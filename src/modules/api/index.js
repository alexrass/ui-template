import queryString from 'query-string';

import { call, put } from 'redux-saga/effects';

export async function doGet(baseUrl, { query, ...options } = {}) {
  let url = baseUrl;
  if (query) {
    url += '?' + queryString.stringify(query);
  }

  _.merge(options, {
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  const response = await fetch(url, options);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const responseMessage = await response.text();
    const error = new Error(responseMessage);
    error.code = response.status;
    throw error;
  }
}

export async function doPost(url, { params, ...options } = {}) {
  _.merge(options, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(params)
  });

  const response = await fetch(url, options);
  if (response.ok) {
    try {
      return await response.json();
    } catch(e) {
      return await response.text();
    }
  } else {
    const responseMessage = await response.text();
    const error = new Error(responseMessage);
    error.code = response.status;
    throw error;
  }
}

export async function doPut(url, { params, ...options } = {}) {
  _.merge(options, {
    credentials: 'same-origin',
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(params)
  });

  const response = await fetch(url, options);
  if (response.ok) {
    try {
      return await response.json();
    } catch(e) {
      return await response.text();
    }
  } else {
    const responseMessage = await response.text();
    const error = new Error(responseMessage);
    error.code = response.status;
    throw error;
  }
}

export async function doDelete(url, { ...options } = {}) {
  _.merge(options, {
    credentials: 'same-origin',
    method: 'delete',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  const response = await fetch(url, options);
  if (response.ok) {
    return true;
  } else {
    const responseMessage = await response.text();
    const error = new Error(responseMessage);
    error.code = response.status;
    throw error;
  }
}
