import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleAuthButton = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        alert('Redirect to Google Auth');
      }}
      sx={{
        width: '200px',
        borderRadius: '2rem',
        textTransform: 'none',
      }}
      startIcon={<GoogleIcon />}
    >
      Login with Google
    </Button>
  );
};

export default GoogleAuthButton;
