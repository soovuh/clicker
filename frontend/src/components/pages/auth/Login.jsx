import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, Typography, TextField, Button } from '@mui/material';
import { loginUser } from '../../../functions/httpRequests';
import { useAuth } from '../../../context/AuthContext';
import RouterLink from '../../UI/RouterLink';
import Divider from '../../UI/Divider';
import GoogleAuthButton from '../../UI/GoogleAuthButton';
import GitHubAuthButton from '../../UI/GitHubAuthButton';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  const handleEmailChange = e => {
    setUser(prevState => ({ ...prevState, email: e.target.value }));
  };

  const handlePasswordChange = e => {
    setUser(prevState => ({ ...prevState, password: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const tokens = await loginUser(user);

    if (tokens.access && tokens.refresh) {
      setTokens(tokens.access, tokens.refresh);

      //TODO: Find any better solution than setTimeout()
      setTimeout(() => {
        setUser({ email: '', password: '' });
        navigate('/');
      }, 0);
    } else {
      alert(tokens.detail);
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
          padding: '1rem',
        }}
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight="bold">
          Login
        </Typography>
        <TextField
          required
          id="email-input"
          label="Email"
          type="email"
          value={user.email}
          onChange={handleEmailChange}
          placeholder="your.email@example.com"
        />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
        />
        <RouterLink to="/signup">
          <Typography
            variant="body2"
            sx={{ transition: '0.1s', '&:hover': { color: '#1976d2' } }}
          >
            Don't have an account yet?
          </Typography>
        </RouterLink>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: '200px',
            borderRadius: '2rem',
            textTransform: 'none',
          }}
        >
          Login
        </Button>
        <Divider />
        <GoogleAuthButton />
        <GitHubAuthButton />
      </Stack>
    </Paper>
  );
};

export default Login;
