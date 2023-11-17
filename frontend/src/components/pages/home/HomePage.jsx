import { useEffect, useState } from 'react';
import BigButton from './BigButton';
import Counter from './Counter';
import { useAuth } from '../../../context/AuthContext';
import { getUser } from '../../../functions/httpRequests';

import { Paper, Stack } from '@mui/material';
import Display from '../../UI/Display';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const INITIAL_USER = {
  id: null,
  email: null,
  username: 'Guest User',
  image: null,
  clicks: 0,
};

const HomePage = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState(INITIAL_USER);
  const logout = () => {
    setUser(INITIAL_USER);
  };

  useEffect(() => {
    if (!accessToken) {
      logout();
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await getUser(accessToken);
        const data = await response.json();

        if (!response.ok) {
          return;
        }

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [accessToken]);

  return (
    <Stack sx={layout}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          padding: '1rem',
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Display
          value={user.username}
          sx={{
            color: 'white',
            variant: 'h5',
            fontSize: '30px',
            padding: '4px 8px',
            minWidth: '220px',
          }}
        />
        <Counter clicks={user.clicks} />
        <BigButton onClick={setUser}>Push me</BigButton>
      </Paper>
    </Stack>
  );
};

export default HomePage;
