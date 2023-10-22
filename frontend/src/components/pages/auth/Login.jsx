import { useState } from 'react';

import { Paper, Stack, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ email, password });
    setEmail('');
    setPassword('');
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
          value={email}
          onChange={handleEmailChange}
          placeholder="your.email@example.com"
        />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          value={password}
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
