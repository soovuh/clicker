import { useAuth } from '../../../context/AuthContext';
import { useUserData } from '../../../hooks/useUserData';
import { Stack, Box, Typography, Paper } from '@mui/material';
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
        <Paper
          elevation={4}
          sx={{
            padding: {
              xs: '0.5rem',
              sm: '1rem',
            },
            borderRadius: '1rem',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: {
                xs: '240px',
                sm: '300px',
              },
              height: {
                xs: '240px',
                sm: '300px',
              },
              borderRadius: '1rem',
              overflow: 'hidden',
            }}
          >
            <img
              src={image}
              alt={username}
              style={{
                width: 'inherit',
                height: 'inherit',
              }}
            />
          </Box>
          <Stack>
            <Typography>Username: {username}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Clicks: {clicks}</Typography>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default ProfilePage;
