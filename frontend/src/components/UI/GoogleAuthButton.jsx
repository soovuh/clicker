import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { getGoogleAuthURL } from '../../functions/httpRequests';

const GoogleAuthButton = ({ children }) => {
  const handleClick = async () => {
    const response = await getGoogleAuthURL();

    if (response.authorization_url) {
      window.location.href = response.authorization_url;
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        width: '200px',
        borderRadius: '2rem',
        textTransform: 'none',
      }}
      startIcon={<GoogleIcon />}
    >
      {children}
    </Button>
  );
};

export default GoogleAuthButton;
