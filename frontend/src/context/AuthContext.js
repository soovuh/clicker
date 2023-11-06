import { createContext, useState, useContext, useEffect } from 'react';
import { checkAuth, refreshAccessToken } from '../functions/httpRequests';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || null
  );
  const [isAuthorized, setIsAuthorized] = useState(
    !!localStorage.getItem('accessToken') || false
  );

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken]);

  const setAuth = async accessToken => {
    try {
      const authResponse = await checkAuth(accessToken);

      if (authResponse.ok) {
        setIsAuthorized(true);
        return;
      }

      const refreshResponse = await refreshAccessToken(refreshToken);
      const refreshData = await refreshResponse.json();
      const { access } = refreshData;

      if (!refreshResponse.ok) {
        alert('Whoops! Something went wrong...');
        throw new Error(refreshData.detail);
      }

      setAccessToken(access);
    } catch (error) {
      console.error(error);
    }
  };

  const setTokens = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setAuth(newAccessToken);
  };

  const removeTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthorized(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthorized,
        setTokens,
        removeTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
