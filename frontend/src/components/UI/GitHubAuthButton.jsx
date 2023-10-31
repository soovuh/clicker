import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubAuthButton = ({ children }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        alert('Redirect to GitHub Auth');
      }}
      sx={{
        width: '200px',
        borderRadius: '2rem',
        textTransform: 'none',
      }}
      startIcon={<GitHubIcon />}
    >
      {children}
    </Button>
  );
};

export default GitHubAuthButton;
