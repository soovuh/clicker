import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Paper, Typography, TextField, Button } from '@mui/material';
import { resetPasswordMail } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await resetPasswordMail(email);

      if (!response.ok) {
        alert('Whoops! Something went wrong...');
        const { status, statusText } = response;
        throw new Error(`${status} ${statusText}`);
      }

      alert('We sent a letter to your email. Please check your inbox');
      setEmail('');
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  return (
    <Stack sx={layout}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          component="form"
          spacing={2}
          alignItems="center"
          onSubmit={handleSubmit}
          sx={{
            width: '320px',
            padding: '1rem',
          }}
          autoComplete="off"
        >
          <Typography variant="h5" fontWeight="bold">
            Reset password
          </Typography>
          <Typography variant="h5">Please enter your email</Typography>
          {isLoading ? (
            <Loading type="bars" />
          ) : (
            <TextField
              required
              fullWidth
              id="email-input"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your.email@example.com"
            />
          )}

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: '320px',
              borderRadius: '2rem',
              textTransform: 'none',
            }}
          >
            <Typography variant="h6">Reset</Typography>
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ResetPasswordPage;
