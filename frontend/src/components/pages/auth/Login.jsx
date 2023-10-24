import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, Typography, TextField, Button } from '@mui/material';
import { loginUser } from '../../../functions/httpRequests';

import { useLocalStorageAuth } from '../../../hooks/useLocalStorageAuth';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useLocalStorageAuth();

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
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
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
        spacing={2}
        alignItems="center"
        onSubmit={handleSubmit}
        sx={{
          padding: '1rem',
        }}
        // noValidate
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight="bold">
          Sign in
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
        <Button
          variant="contained"
          type="submit"
          // disabled
          sx={{
            width: '150px',
            borderRadius: '2rem',
          }}
        >
          Sign in
        </Button>
      </Stack>
    </Paper>
  );
};

export default Login;
