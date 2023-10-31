import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleAuthButton = ({ children }) => {
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
      {children}
    </Button>
  );
};

export default GoogleAuthButton;
