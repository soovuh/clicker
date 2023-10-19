import Display from '../UI/Display';
import { Stack } from '@mui/material';

const Counter = ({ counter }) => {
  return (
    <Stack>
      <Display
        value={counter}
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
