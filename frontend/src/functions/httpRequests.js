const HOST = 'http://127.0.0.1:8000';

export const createUser = async user => {
  const { email, name, password, re_password } = user;
  const response = await fetch(`${HOST}/api/auth/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
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

export const getAccessToken = async user => {
  const response = await fetch(`${HOST}/api/auth/jwt/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  return await response.json();
};

export const checkAuth = async () => {
  const response = await fetch(`${HOST}/api/auth/jwt/verify/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      token: 'access_token',
    },
  });

  return response.json();
};

export const refreshAccessToken = async () => {
  const response = await fetch(`${HOST}/api/auth/jwt/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      token: 'access_token',
    },
  });

  return response.json();
};

export const resetPasswordMail = async () => {
  const response = await fetch(`${HOST}/api/auth/users/reset_password/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: 'user.email@example.com',
    },
  });

  return response.json();
};

export const resetPasswordConfirm = async () => {
  const response = await fetch(
    `${HOST}/api/auth/users/reset_password_confirm/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        uid: 'Mg',
        token: 'reset_password_token',
        new_password: 'password',
        re_new_password: 'password',
      },
    }
  );

  return response.json();
};

export const getUser = async () => {
  const response = await fetch(`${HOST}/api/auth/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'JWT access_token',
      Accept: 'application/json',
    },
  });

  return response.json();
};
