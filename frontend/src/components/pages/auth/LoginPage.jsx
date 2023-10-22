import { Stack } from '@mui/material';
import Login from './Login';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const LoginPage = () => {
  return (
    <Stack sx={layout}>
      <Login />
    </Stack>
  );
};

export default LoginPage;
