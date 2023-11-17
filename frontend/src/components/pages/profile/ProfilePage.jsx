import { useAuth } from '../../../context/AuthContext';
import { useUserData } from '../../../hooks/useUserData';
import { Stack, Typography } from '@mui/material';
import Loading from '../../UI/Loading';

const ProfilePage = () => {
  const { accessToken } = useAuth();
  const { user, loading } = useUserData(accessToken);
  const { email, username, image, clicks } = user;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100%' }}
    >
      {loading ? (
        <Loading type="bars" />
      ) : (
        <Stack>
          <Typography>ImageURL: {image}</Typography>
          <Typography>Username: {username}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Clicks: {clicks}</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ProfilePage;
