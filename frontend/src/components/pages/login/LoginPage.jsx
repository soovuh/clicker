import { Stack } from '@mui/material';
import LoginForm from './LoginForm';

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
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
