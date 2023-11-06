import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { getGoogleAuthURL } from '../../functions/httpRequests';

const GoogleAuthButton = ({ children }) => {
  const redirectUser = url => {
    window.location.href = url;
  };

  const handleClick = async () => {
    try {
      const response = await getGoogleAuthURL();
      const data = await response.json();
      const { authorization_url: authURL } = data;

      if (!response.ok) {
        const { status, statusText } = response;
        throw new Error(`${status} ${statusText}`);
      }

      redirectUser(authURL);
    } catch (error) {
      console.error(error);
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
