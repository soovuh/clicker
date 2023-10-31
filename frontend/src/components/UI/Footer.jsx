import { AppBar, Stack, Typography, IconButton } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        justifyContent: 'center',
        height: '50px',
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography variant="h6">© Clicker App, 2023</Typography>
        <IconButton color="inherit" href="https://github.com/soovuh/clicker">
          <GitHub />
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default Footer;
