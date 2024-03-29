import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Breadcrumbs,
  Button,
} from '@mui/material';
import { loginUser } from '../../../functions/httpRequests';
import { useAuth } from '../../../context/AuthContext';
import RouterLink from '../../UI/RouterLink';
import Divider from '../../UI/Divider';
import GoogleAuthButton from '../../UI/GoogleAuthButton';
import GitHubAuthButton from '../../UI/GitHubAuthButton';

const CustomTypography = ({ children }) => {
  return (
    <Typography
      variant="body2"
      sx={{ transition: '0.1s', '&:hover': { color: '#1976d2' } }}
    >
      {children}
    </Typography>
  );
};

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const { setTokens } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = e => {
    setUser(prevState => ({ ...prevState, email: e.target.value }));
  };

  const handlePasswordChange = e => {
    setUser(prevState => ({ ...prevState, password: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await loginUser(user);
      const data = await response.json();
      const { access, refresh } = data;

      if (!response.ok) {
        alert(data.detail);
        const { status, statusText } = response;
        throw new Error(`${status} ${statusText}`);
      }

      setTokens(access, refresh);
      setUser({ email: '', password: '' });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      <Stack
        component="form"
        spacing={1}
        alignItems="center"
        onSubmit={handleSubmit}
        sx={{
          width: '320px',
          padding: '1rem',
        }}
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight="bold">
          Login
        </Typography>
        <TextField
          required
          fullWidth
          id="email-input"
          label="Email"
          type="email"
          value={user.email}
          onChange={handleEmailChange}
          placeholder="your.email@example.com"
        />
        <TextField
          required
          fullWidth
          id="password-input"
          label="Password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
        />
        <Breadcrumbs>
          <RouterLink to="/signup">
            <CustomTypography>Create account</CustomTypography>
          </RouterLink>
          <RouterLink to="/password/reset">
            <CustomTypography>Reset password</CustomTypography>
          </RouterLink>
        </Breadcrumbs>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: '320px',
            borderRadius: '2rem',
            textTransform: 'none',
          }}
        >
          <Typography variant="h6">Login</Typography>
        </Button>
        <Divider />
        <GoogleAuthButton>
          <Typography variant="h6">Login with Google</Typography>
        </GoogleAuthButton>
        <GitHubAuthButton>
          <Typography variant="h6">Login with GitHub</Typography>
        </GitHubAuthButton>
      </Stack>
    </Paper>
  );
};

export default Login;
