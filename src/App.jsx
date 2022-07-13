import { Routes, Route } from 'react-router';
import { NotFound } from './pages/not-found';
import { Home } from './pages/home';
import { Swap } from './pages/swap';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/swap" element={<Swap />} />
    </Routes>
  );
};

export default App;
