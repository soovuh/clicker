import { useState, useEffect } from 'react';

export function useLocalStorageAuth() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || null
  );

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [accessToken, refreshToken]);

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  return { accessToken, setAccessToken, refreshToken, setRefreshToken, logout };
}
