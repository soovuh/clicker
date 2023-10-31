import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubAuthButton = () => {
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
      Login with GitHub
    </Button>
  );
};

export default GitHubAuthButton;
