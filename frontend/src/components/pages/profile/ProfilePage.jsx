import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getUser, getUserExtended } from '../../../functions/httpRequests';
import { Stack, Typography } from '@mui/material';
import Loading from '../../UI/Loading';

const INITIAL_USER = {
  id: '',
  email: '',
  username: '',
  image: null,
  clicks: 0,
};

const ProfilePage = () => {
  const { accessToken } = useAuth();
  const [user, setUser] = useState(INITIAL_USER);
  const { id, email, username, image, clicks } = user;

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
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {id ? (
        <Stack>
          <Typography>ImageURL: {image}</Typography>
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Clicks: {clicks}</Typography>
        </Stack>
      ) : (
        <Loading type="bars" />
      )}
    </Stack>
  );
};

export default ProfilePage;
