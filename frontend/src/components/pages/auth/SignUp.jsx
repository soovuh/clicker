import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Stack, Typography, TextField, Button } from '@mui/material';
import { createUser } from '../../../functions/httpRequests';
import Divider from '../../UI/Divider';
import GoogleAuthButton from '../../UI/GoogleAuthButton';
import GitHubAuthButton from '../../UI/GitHubAuthButton';

const SignUp = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = e => {
    setUser(prevState => ({ ...prevState, email: e.target.value }));
  };
  const handleUsernameChange = e => {
    setUser(prevState => ({ ...prevState, username: e.target.value }));
  };

  const handlePasswordChange = e => {
    setUser(prevState => ({ ...prevState, password: e.target.value }));
  };
  const handleRepeatPasswordChange = e => {
    setUser(prevState => ({ ...prevState, repeatPassword: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, username, password, repeatPassword: re_password } = user;

    try {
      const res = await createUser({ email, username, password, re_password });
      const data = await res.json();
      setResponse(data);

      if (!res.ok) {
        const { status, statusText } = res;
        throw new Error(`${status} ${statusText}`);
      }

      setUser({ email: '', username: '', password: '', repeatPassword: '' });
      alert(
        'We sent you a letter with a activation link to your email. Please check your inbox.'
      );
      navigate('/login');
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
        spacing={1.5}
        alignItems="center"
        justifyContent="center"
        onSubmit={handleSubmit}
        sx={{
          padding: '1rem',
          width: '320px',
        }}
        autoComplete="off"
      >
        <Typography variant="h5" fontWeight="bold">
          Sign up
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
          helperText={Array.isArray(response.email) && response.email[0]}
          error={!!response.email && Array.isArray(response.email)}
        />
        <TextField
          required
          fullWidth
          id="username-input"
          label="Name"
          type="text"
          value={user.username}
          onChange={handleUsernameChange}
          placeholder="Your Name"
        />
        <TextField
          required
          fullWidth
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
          fullWidth
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
          sx={{
            width: '320px',
            lineHeight: '2rem',
            borderRadius: '2rem',
            textTransform: 'none',
          }}
        >
          <Typography variant="h6">Sign up</Typography>
        </Button>
        <Divider />
        <GoogleAuthButton>
          <Typography variant="h6">Sign up with Google</Typography>
        </GoogleAuthButton>
        <GitHubAuthButton>
          <Typography variant="h6">Sign up with GitHub</Typography>
        </GitHubAuthButton>
      </Stack>
    </Paper>
  );
};

export default SignUp;
