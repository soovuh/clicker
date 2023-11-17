import { useState, useEffect } from 'react';
import { getUser } from '../functions/httpRequests';

const INITIAL_USER = {
  id: null,
  email: null,
  username: null,
  image: null,
  clicks: 0,
};

export const useUserData = accessToken => {
  const [user, setUser] = useState(INITIAL_USER);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(INITIAL_USER);
  };

  useEffect(() => {
    if (!accessToken) logout();

    const fetchUser = async () => {
      try {
        const response = await getUser(accessToken);
        const data = await response.json();

        if (!response.ok) {
          setError('Error fetching user data');
          return;
        }

        setUser(data);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  return { user, setUser, error, loading };
};
