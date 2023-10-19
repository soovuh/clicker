import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Home from './pages/Home';

import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
