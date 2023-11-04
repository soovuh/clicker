import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getGitHubAuthURL } from '../../functions/httpRequests';

const GitHubAuthButton = ({ children }) => {
  const handleClick = async () => {
    const response = await getGitHubAuthURL();

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
      startIcon={<GitHubIcon />}
    >
      {children}
    </Button>
  );
};

export default GitHubAuthButton;
