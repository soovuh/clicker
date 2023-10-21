import { Stack, Typography } from '@mui/material';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <ReactLoading
        type={type}
        color={color ?? 'rgb(25, 118, 210)'}
        height={30}
        width={30}
      />
      <Typography variant="h5">Loading...</Typography>
    </Stack>
  );
};

export default Loading;
