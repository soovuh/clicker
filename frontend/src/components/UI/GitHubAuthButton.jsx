import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getGitHubAuthURL } from '../../functions/httpRequests';

const GitHubAuthButton = ({ children }) => {
  const redirectUser = url => {
    window.location.href = url;
  };

  const handleClick = async () => {
    try {
      const response = await getGitHubAuthURL();
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
      startIcon={<GitHubIcon />}
    >
      {children}
    </Button>
  );
};

export default GitHubAuthButton;
