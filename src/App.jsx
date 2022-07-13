import { Routes, Route } from 'react-router';
import { NotFound } from './pages/not-found';
import { Home } from './pages/home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
