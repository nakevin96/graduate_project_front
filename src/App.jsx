import { Routes, Route } from 'react-router';
import { NotFound } from './pages/not-found';
import { Home } from './pages/home';
import { Swap } from './pages/swap';
import { Union } from './pages/union';
import { TransactionProvider } from './context/TransactionContext';

const App = () => {
  return (
    <TransactionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/union" element={<Union />} />
      </Routes>
    </TransactionProvider>
  );
};

export default App;
