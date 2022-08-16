import { Routes, Route } from 'react-router';
import {
  TransactionProvider,
  WalletProvider,
  SwapProvider,
  UnionProvider,
} from './context';
import { NotFound } from './pages/not-found';
import { Home } from './pages/home';
import { Swap } from './pages/swap';
import { Union } from './pages/union';
import { UnionDetail } from './pages/union/union-detail';

const App = () => {
  return (
    <TransactionProvider>
      <WalletProvider>
        <SwapProvider>
          <UnionProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/union" element={<Union />} />
              <Route path="/unionDetail" element={<UnionDetail />} />
            </Routes>
          </UnionProvider>
        </SwapProvider>
      </WalletProvider>
    </TransactionProvider>
  );
};

export default App;
