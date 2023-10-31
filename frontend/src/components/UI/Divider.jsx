import { Stack, Typography } from '@mui/material';

const Divider = () => {
  return (
    <Stack
      gap={1}
      direction="row"
      width="200px"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        sx={{
          height: '1px',
          width: '75px',
          borderRadius: '12px',
          backgroundColor: 'grey',
        }}
      ></Stack>
      <Typography variant="body2">or</Typography>
      <Stack
        sx={{
          height: '1px',
          width: '75px',
          borderRadius: '12px',
          backgroundColor: 'grey',
        }}
      ></Stack>
    </Stack>
  );
};

export default Divider;
