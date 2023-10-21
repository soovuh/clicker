import { useState } from 'react';
import BigButton from './BigButton';
import Counter from './Counter';

import { Stack } from '@mui/material';
import Display from '../../UI/Display';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const HomePage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <Stack sx={layout}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Display value="Username" sx={{ color: 'white', variant: 'h5' }} />
        <Counter counter={counter} />
        <BigButton setCounter={setCounter} />
      </Stack>
    </Stack>
  );
};

export default HomePage;
