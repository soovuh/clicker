import { useRouteError } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';

const layout = {
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
};

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const content = (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Oops!
      </Typography>
      <Typography variant="h6">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="h6">{error.statusText || error.message}</Typography>
    </Stack>
  );

  return (
    <Stack sx={layout}>
      <Navbar />
      {content}
      <Footer />
    </Stack>
  );
}
