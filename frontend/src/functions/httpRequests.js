const HOST = 'http://127.0.0.1:8000';

export const createUser = async ({ email, name, password, re_password }) => {
  const response = await fetch(`${HOST}/api/auth/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, name, password, re_password }),
  });

  return await response.json();
};

export const activateAccount = async (uid, token) => {
  const response = await fetch(`${HOST}/api/auth/users/activation/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid, token }),
  });

  return await response.json();
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${HOST}/api/auth/jwt/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};

export const checkAuth = async accessToken => {
  const response = await fetch(`${HOST}/api/auth/jwt/verify/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: accessToken }),
  });

  return await response.json();
};

export const refreshAccessToken = async accessToken => {
  const response = await fetch(`${HOST}/api/auth/jwt/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: accessToken }),
  });

  return await response.json();
};

export const resetPasswordMail = async email => {
  const response = await fetch(`${HOST}/api/auth/users/reset_password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  return await response.json();
};

export const resetPasswordConfirm = async ({
  uid,
  token,
  new_password,
  re_new_password,
}) => {
  const response = await fetch(
    `${HOST}/api/auth/users/reset_password_confirm/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, token, new_password, re_new_password }),
    }
  );

  return await response.json();
};

export const getUser = async accessToken => {
  const response = await fetch(`${HOST}/api/auth/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
      Accept: 'application/json',
    },
  });

  return await response.json();
};
