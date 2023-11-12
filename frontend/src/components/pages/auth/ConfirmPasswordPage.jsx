import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Paper, Typography, TextField, Button } from '@mui/material';
import { resetPasswordConfirm } from '../../../functions/httpRequests';
import BigButton from '../home/BigButton';
import Loading from '../../UI/Loading';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const ConfirmPasswordPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { uid, resetPasswordToken } = params;
  const [newPassword, setNewPassword] = useState({
    password: '',
    repeatPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await resetPasswordConfirm({
        uid,
        token: resetPasswordToken,
        new_password: newPassword.password,
        re_new_password: newPassword.repeatPassword,
      });

      if (!response.ok) {
        alert('Whoops! Something went wrong...');
        const { status, statusText } = response;
        throw new Error(`${status} ${statusText}`);
      }

      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    navigate('/login');
  };

  const handlePasswordChange = e => {
    setNewPassword(prevState => ({ ...prevState, password: e.target.value }));
  };

  const handleRepeatPasswordChange = e => {
    setNewPassword(prevState => ({
      ...prevState,
      repeatPassword: e.target.value,
    }));
  };

  return (
    <Stack sx={layout}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          display: 'flex',
          gap: isUpdated ? '0.5rem' : '',
          padding: isUpdated ? '1rem' : '',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isUpdated ? (
          <>
            <Typography variant="h5">Successfully updated.</Typography>
            <Typography variant="h5">Please Login</Typography>
            <BigButton onClick={handleRedirect}>
              <Typography variant="h6">Go to Login page</Typography>
            </BigButton>
          </>
        ) : (
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
              Enter new password
            </Typography>
            {isLoading ? (
              <Loading type="bars" />
            ) : (
              <>
                <TextField
                  required
                  fullWidth
                  id="password-input"
                  label="Password"
                  type="password"
                  value={newPassword.password}
                  onChange={handlePasswordChange}
                  // helperText={!!response.password && response.password[0]}
                  // error={!!response.password}
                />
                <TextField
                  required
                  fullWidth
                  id="repeat-password-input"
                  label="Repeat password"
                  type="password"
                  value={newPassword.repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  // helperText={!!response.non_field_errors && response.non_field_errors[0]}
                  // error={!!response.non_field_errors}
                />
              </>
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
              <Typography variant="h6">Update password</Typography>
            </Button>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

export default ConfirmPasswordPage;
