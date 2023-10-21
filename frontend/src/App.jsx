import { Outlet, useNavigation } from 'react-router-dom';
import { Stack } from '@mui/material';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Loading from './components/UI/Loading';

const layout = {
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
};

function App() {
  const { state } = useNavigation();
  return (
    <Stack sx={layout}>
      <Navbar />
      {state === 'loading' ? <Loading type="bars" /> : <Outlet />}

      <Footer />
    </Stack>
  );
}

export default App;
