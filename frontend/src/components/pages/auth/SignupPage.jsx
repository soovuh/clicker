import { Stack } from '@mui/material';
import Signup from './SignUp';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const SignupPage = () => {
  return (
    <Stack sx={layout}>
      <Signup />
    </Stack>
  );
};

export default SignupPage;
