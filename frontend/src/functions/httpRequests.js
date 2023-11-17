const HOST = 'http://127.0.0.1:8000';
// const REDIRECT_URI = 'http://localhost:3000';

// const REDIRECT_URI = 'http://127.0.0.1:3000';
// const REDIRECT_URI = 'http://127.0.0.1:3000/auth/google';

// const REDIRECT_URI = 'http://localhost:3000';
const REDIRECT_URI_GOOGLE = 'http://localhost:3000/auth/google';
const REDIRECT_URI_GITHUB = 'http://localhost:3000/auth/github';

export const createUser = async ({
  email,
  username,
  password,
  re_password,
}) => {
  const response = await fetch(`${HOST}/api/auth/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, username, password, re_password }),
  });

  return response;
};

export const getGoogleAuthURL = async () => {
  const response = await fetch(
    `${HOST}/api/auth/o/google-oauth2/?redirect_uri=${REDIRECT_URI_GOOGLE}`
  );

  return response;
};

export const createUserGoogle = async (state, code) => {
  const response = await fetch(
    `${HOST}/api/auth/o/google-oauth2/?state=${state}&code=${code}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response;
};

export const getGitHubAuthURL = async () => {
  const response = await fetch(
    `${HOST}/api/auth/o/github/?redirect_uri=${REDIRECT_URI_GITHUB}`
  );

  return response;
};

export const createUserGitHub = async (state, code) => {
  const response = await fetch(
    `${HOST}/api/auth/o/github/?state=${state}&code=${code}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response;
};

export const activateAccount = async (uid, token) => {
  const response = await fetch(`${HOST}/api/auth/users/activation/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, token }),
  });

  return response;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${HOST}/api/auth/jwt/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return response;
};

export const checkAuth = async accessToken => {
  const response = await fetch(`${HOST}/api/auth/jwt/verify/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: accessToken }),
  });

  return response;
};

export const refreshAccessToken = async accessToken => {
  const response = await fetch(`${HOST}/api/auth/jwt/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: accessToken }),
  });

  return response;
};

export const resetPasswordMail = async email => {
  const response = await fetch(`${HOST}/api/auth/users/reset_password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  return response;
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

  return response;
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

  return response;
};

export const getUsersList = async () => {
  const response = await fetch(`${HOST}/api/info/users/`, {
    method: 'GET',
  });

  return response;
};

export const setUserClicks = async (id, clicks, accessToken) => {
  const response = await fetch(`${HOST}/api/info/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
      Accept: 'application/json',
    },
    body: JSON.stringify({ clicks }),
  });

  return response;
};

export const setUserName = async (id, username, accessToken) => {
  const response = await fetch(`${HOST}/api/info/users/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
      Accept: 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  return response;
};
