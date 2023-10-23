import { useState } from 'react';
import { Paper, Stack, Typography, TextField, Button } from '@mui/material';
import { loginUser } from '../../../functions/httpRequests';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleEmailChange = e => {
    setUser(prevState => ({ ...prevState, email: e.target.value }));
  };

  const handlePasswordChange = e => {
    setUser(prevState => ({ ...prevState, password: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const tokens = await loginUser(user);
    console.log('tokens', tokens);
    setUser({ email: '', password: '' });
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
