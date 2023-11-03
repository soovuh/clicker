import { useEffect, useState } from 'react';
import BigButton from './BigButton';
import Counter from './Counter';
import { useAuth } from '../../../context/AuthContext';
import { getUser, getUserExtended } from '../../../functions/httpRequests';

import { Stack } from '@mui/material';
import Display from '../../UI/Display';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const INITIAL_USER = {
  id: '',
  email: '',
  username: 'Unknown',
  image: null,
  clicks: 0,
};

const HomePage = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState(INITIAL_USER);

  useEffect(() => {
    if (!accessToken) return;
    const fetchUser = async () => {
      const response = await getUser(accessToken);

      if (response.code) {
        return;
      }

      const user = await getUserExtended(response.id);
      console.log('user', user);
      setUser(user);
    };
    fetchUser();
  }, [accessToken]);

  return (
    <Stack sx={layout}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Display value={user.username} sx={{ color: 'white', variant: 'h5' }} />
        <Counter clicks={user.clicks} />
        <BigButton updateClicks={setUser} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
