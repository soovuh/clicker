import { useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { activateAccount } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';

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
      <Stack direction="column" spacing={2} alignItems="center">
        {isActivated ? (
          <>
            <Typography variant="h5">
              Account activated. Please Login
            </Typography>
            <Button
              sx={{ textTransform: 'none' }}
              variant="contained"
              onClick={handleRedirect}
            >
              <Typography variant="h6">Go to Login page</Typography>
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5">
              Please confirm account activation
            </Typography>
            {isLoading ? (
              <Loading type="bars" />
            ) : (
              <Button
                sx={{ textTransform: 'none' }}
                variant="contained"
                onClick={handleActivation}
              >
                <Typography variant="h6">Activate</Typography>
              </Button>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default ActivationPage;
