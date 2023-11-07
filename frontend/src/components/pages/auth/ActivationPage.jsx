import { useState } from 'react';
import { Stack, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { activateAccount } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';
import BigButton from '../home/BigButton';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const ActivationPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { uid, activationToken } = params;
  const [isActivated, setIsActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActivation = async () => {
    try {
      setIsLoading(true);
      const response = await activateAccount(uid, activationToken);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      setIsActivated(true);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <Stack sx={layout}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          padding: '1rem',
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isActivated ? (
          <>
            <Typography variant="h5">Successfully activated.</Typography>
            <Typography variant="h5">Please Login</Typography>
            <BigButton onClick={handleRedirect}>
              <Typography variant="h6">Go to Login page</Typography>
            </BigButton>
          </>
        ) : (
          <>
            <Typography variant="h5">Confirm account activation</Typography>
            {isLoading ? (
              <Loading type="bars" />
            ) : (
              <BigButton onClick={handleActivation}>
                <Typography variant="h6">Activate</Typography>
              </BigButton>
            )}
          </>
        )}
      </Paper>
    </Stack>
  );
};

export default ActivationPage;
