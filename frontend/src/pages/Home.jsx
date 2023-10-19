import { useState } from 'react';
import BigButton from '../components/home page/BigButton';
import Counter from '../components/home page/Counter';

import styles from '../styles/pages/Home.module.scss';
import { Stack } from '@mui/material';
import Display from '../components/UI/Display';

const Home = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className={styles.container}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Display value="Username" sx={{ color: 'white', variant: 'h5' }} />
        <Counter counter={counter} />
        <BigButton setCounter={setCounter} />
      </Stack>
    </div>
  );
};

export default Home;
