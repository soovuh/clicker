import { useEffect, useState } from 'react';
import BigButton from './BigButton';
import Counter from './Counter';
import { useAuth } from '../../../context/AuthContext';
import { getUser } from '../../../functions/httpRequests';

import { Stack } from '@mui/material';
import Display from '../../UI/Display';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const INITIAL_USER = { email: '', username: 'Unknown', id: '' };

const HomePage = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState(INITIAL_USER);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!accessToken) return;
    const fetchUser = async () => {
      const response = await getUser(accessToken);

      if (response.code) {
        return;
      }

      console.log('response', response);
      setUser(response);
    };
    fetchUser();
  }, [accessToken]);

  return (
    <Stack sx={layout}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Display value={user.username} sx={{ color: 'white', variant: 'h5' }} />
        <Counter counter={counter} />
        <BigButton setCounter={setCounter} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
