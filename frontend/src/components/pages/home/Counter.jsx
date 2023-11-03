import Display from '../../UI/Display';
import { Stack } from '@mui/material';

const Counter = ({ clicks }) => {
  return (
    <Stack>
      <Display
        value={clicks}
        sx={{
          fontFamily: 'DS-Digital',
          color: 'white',
          variant: 'h3',
        }}
      />
    </Stack>
  );
};

export default Counter;
