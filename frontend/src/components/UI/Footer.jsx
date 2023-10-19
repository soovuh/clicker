import { AppBar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
      }}
    >
      <Typography variant="h6">Footer</Typography>
    </AppBar>
  );
};

export default Footer;
