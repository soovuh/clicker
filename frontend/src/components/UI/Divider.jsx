import { Stack, Typography } from '@mui/material';

const Divider = () => {
  return (
    <Stack
      gap={1}
      direction="row"
      width="320px"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        sx={{
          height: '1px',
          width: '120px',
          borderRadius: '12px',
          backgroundColor: 'grey',
        }}
      ></Stack>
      <Typography variant="body2">or</Typography>
      <Stack
        sx={{
          height: '1px',
          width: '120px',
          borderRadius: '12px',
          backgroundColor: 'grey',
        }}
      ></Stack>
    </Stack>
  );
};

export default Divider;
