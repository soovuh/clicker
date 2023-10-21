import { Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const LeadersPage = () => {
  const users = useLoaderData();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Typography>That's a Leaders Page.</Typography>
      {users?.map(({ name, id }) => (
        <Stack key={id}>
          <Typography>{name}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default LeadersPage;
