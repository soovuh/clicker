import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, Typography, TextField, Button } from '@mui/material';
import { createUser } from '../../../functions/httpRequests';

const SignUp = () => {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
  });
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const isRequestSuccess = response => {
    if (
      Array.isArray(response.email) ||
      Array.isArray(response.name) ||
      Array.isArray(response.password) ||
      Array.isArray(response.non_field_errors)
    ) {
      return false;
    }
    return true;
  };

  const handleEmailChange = e => {
    setUser(prevState => ({ ...prevState, email: e.target.value }));
  };
  const handleNameChange = e => {
    setUser(prevState => ({ ...prevState, name: e.target.value }));
  };

  const handlePasswordChange = e => {
    setUser(prevState => ({ ...prevState, password: e.target.value }));
  };
  const handleRepeatPasswordChange = e => {
    setUser(prevState => ({ ...prevState, repeatPassword: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, name, password, repeatPassword: re_password } = user;
    const res = await createUser({ email, name, password, re_password });
    setResponse(res);

    if (isRequestSuccess(res)) {
      setUser({ email: '', name: '', password: '', repeatPassword: '' });
      navigate('/');
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
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight="bold">
          Sign up
        </Typography>
        <TextField
          required
          id="email-input"
          label="Email"
          type="email"
          value={user.email}
          onChange={handleEmailChange}
          placeholder="your.email@example.com"
          helperText={Array.isArray(response.email) && response.email[0]}
          error={!!response.email && Array.isArray(response.email)}
        />
        <TextField
          required
          id="name-input"
          label="Name"
          type="text"
          value={user.name}
          onChange={handleNameChange}
          placeholder="Your Name"
        />
        <TextField
          required
          id="password-input"
          label="Password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          helperText={!!response.password && response.password[0]}
          error={!!response.password}
        />
        <TextField
          required
          id="repeat-password-input"
          label="Repeat password"
          type="password"
          value={user.repeatPassword}
          onChange={handleRepeatPasswordChange}
          helperText={
            !!response.non_field_errors && response.non_field_errors[0]
          }
          error={!!response.non_field_errors}
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

export default SignUp;
