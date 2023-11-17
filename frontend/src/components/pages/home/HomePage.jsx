import BigButton from './BigButton';
import Counter from './Counter';
import { useAuth } from '../../../context/AuthContext';
import { useUserData } from '../../../hooks/useUserData';
import { Paper, Stack } from '@mui/material';
import Display from '../../UI/Display';

const layout = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const HomePage = () => {
  const { accessToken } = useAuth();
  const { user, setUser } = useUserData(accessToken);

  return (
    <Stack sx={layout}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          padding: '1rem',
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Display
          value={user.username ?? 'Guest User'}
          sx={{
            color: 'white',
            variant: 'h5',
            fontSize: '30px',
            padding: '4px 8px',
            minWidth: '220px',
          }}
        />
        <Counter clicks={user.clicks} />
        <BigButton onClick={setUser}>Push me</BigButton>
      </Paper>
    </Stack>
  );
};

export default HomePage;
